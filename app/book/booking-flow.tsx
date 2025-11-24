"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight, Home, Zap, Truck, CheckCircle2, Building, BedDouble, UserCheck, PartyPopper, PlusCircle } from "lucide-react";
import GoogleMapsAutocomplete, { GoogleMapsAddress } from "@/components/google-maps-autocomplete";
import { useCurrentUser } from "@/components/providers/user-provider";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { MY_ADDRESSES_QUERY } from "@/lib/graphql/queries/my-addresses";
import { AVAILABLE_CLEANERS_QUERY } from "@/lib/graphql/queries/available-cleaners";
import { CREATE_BOOKING_MUTATION } from "@/lib/graphql/mutations/create-booking";
import { useRouter } from "next/navigation";
import { Calendar as DayPickerCalendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const locationSizes = [
  {
    id: "studio",
    name: "Studio",
    icon: Building,
    bedrooms: 1,
  },
  {
    id: "1-bedroom",
    name: "1 Bedroom",
    icon: BedDouble,
    bedrooms: 1,
  },
  {
    id: "2-bedrooms",
    name: "2 Bedrooms",
    icon: BedDouble,
    bedrooms: 2,
  },
  {
    id: "3-bedrooms",
    name: "3 Bedrooms",
    icon: BedDouble,
    bedrooms: 3,
  },
  {
    id: "4-bedrooms",
    name: "4+ Bedrooms",
    icon: Home,
    bedrooms: 4,
  },
];

const services = [
  {
    id: "general",
    name: "General Cleaning",
    icon: Home,
    description: "Regular maintenance cleaning for homes and apartments",
    baseHours: 3,
    priceRange: "120-450 RON",
    popular: true,
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    icon: Zap,
    description: "Thorough cleaning including hard-to-reach areas",
    baseHours: 5,
    priceRange: "200-750 RON",
    popular: false,
  },
  {
    id: "move",
    name: "Move-in/out Cleaning",
    icon: Truck,
    description: "Complete cleaning for moving in or out of a property",
    baseHours: 4,
    priceRange: "160-600 RON",
    popular: false,
  },
];

const addOns = [
  { id: "oven", name: "Oven Cleaning", price: "50 RON", hours: 0.5 },
  { id: "windows", name: "Window Cleaning", price: "75 RON", hours: 1 },
  { id: "fridge", name: "Fridge Cleaning", price: "40 RON", hours: 0.5 },
  { id: "garage", name: "Garage Cleaning", price: "60 RON", hours: 1 },
];

const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

export default function BookServicePage() {
  const [step, setStep] = useState(1);
  const [locationSize, setLocationSize] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCleaner, setSelectedCleaner] = useState<any | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [createBookingMutation, { loading: createBookingLoading }] = useMutation(CREATE_BOOKING_MUTATION);

  const { user } = useCurrentUser();
  const router = useRouter();

  const { data: addressesData, loading: addressesLoading } = useQuery(MY_ADDRESSES_QUERY, {
    skip: !user,
  });

  const [getAvailableCleaners, { data: availableCleanersData, loading: availableCleanersLoading }] = useLazyQuery(AVAILABLE_CLEANERS_QUERY);

  useEffect(() => {
    if (user && addressesData?.myAddresses?.length > 0) {
      const defaultAddress = addressesData.myAddresses.find((a: any) => a.isDefault);
      setSelectedAddress(defaultAddress || addressesData.myAddresses[0]);
    }
    // A simple way to pre-fill location size for existing users, can be improved
    if(user) {
        setLocationSize("3-bedrooms");
    }
  }, [user, addressesData]);


  const steps = [
    { num: 1, label: "Location" },
    { num: 2, label: "Service" },
    { num: 3, label: "Address" },
    { num: 4, label: "Schedule" },
    { num: 5, label: "Cleaner" },
    { num: 6, label: "Confirm" },
  ];

  const handleAddressSelect = (address: GoogleMapsAddress) => {
    setSelectedAddress(address);
    setShowNewAddressForm(false);
  };

  const handleFindCleaners = () => {
    const service = services.find(s => s.id === selectedService);
    if (selectedDate && selectedTime && selectedAddress && service) {
      getAvailableCleaners({
        variables: {
          date: selectedDate,
          startTime: selectedTime,
          duration: service.baseHours,
          city: selectedAddress.city,
          postalCode: selectedAddress.postalCode || undefined,
        },
      });
      setStep(5);
    }
  };

  const handleConfirmBooking = async () => {
    if (!user) {
        router.push('/auth');
        return;
    }
    
    if (!selectedService || !locationSize || !selectedAddress || !selectedDate || !selectedTime || !selectedCleaner) {
      console.error("Missing booking details");
      return;
    }

    const input: any = {
      locationSizeId: locationSize,
      serviceId: selectedService,
      addOnsIds: selectedAddons,
      date: selectedDate,
      time: selectedTime,
      cleanerId: selectedCleaner.id,
    };
    
    if (selectedAddress.id) {
        input.addressId = selectedAddress.id;
    } else {
        input.address = {
            street: selectedAddress.street,
            streetNumber: selectedAddress.streetNumber,
            city: selectedAddress.city,
            county: selectedAddress.county,
            postalCode: selectedAddress.postalCode,
            country: selectedAddress.country,
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
        };
    }

    try {
      const { data } = await createBookingMutation({ variables: { input } });
      console.log("Booking created:", data.createBooking);
      router.push("/dashboard/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  
  const getBookingSummary = () => {
    const service = services.find(s => s.id === selectedService);
    const location = locationSizes.find(l => l.id === locationSize);
    const cleaner = availableCleanersData?.availableCleaners.find((c: any) => c.id === selectedCleaner?.id);
    
    if (!service || !location || !selectedAddress || !selectedDate || !selectedTime || !cleaner) {
      return null;
    }

    const totalHours = service.baseHours + selectedAddons.reduce((acc, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return acc + (addon?.hours || 0);
    }, 0);

    const totalPrice = totalHours * (cleaner.hourlyRate / 100);

    return {
      service: service.name,
      location: location.name,
      address: selectedAddress.formattedAddress || `${selectedAddress.street}, ${selectedAddress.city}`,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      cleaner: cleaner.user.displayName,
      totalHours,
      totalPrice,
    };
  };

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">Book a Service</h1>
        <p className="text-muted-foreground mt-2 text-center sm:text-left">
          Follow the steps to book a cleaning service in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-4 pb-2 sm:pt-6">
          <div className="flex items-center justify-between relative">
            {steps.map((item, index) => (
              <div key={item.num} className="flex flex-col items-center flex-1 z-10">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                    step >= item.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > item.num ? (
                    <CheckCircle2 className="h-4 w-4 md:h-5 w-5" />
                  ) : (
                    item.num
                  )}
                </div>
                <span className="text-xs mt-1 text-center hidden sm:block">{item.label}</span>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 hidden sm:block">
              <div
                className={`h-full ${step > 1 ? "bg-primary" : "bg-muted"}`}
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select Location Size */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Select your Location Size</h2>
            <p className="text-muted-foreground text-center sm:text-left">
              This helps us estimate the time and cost of your cleaning.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
            {locationSizes.map((size) => {
              const Icon = size.icon;
              return (
                <Card
                  key={size.id}
                  className={`relative flex flex-col items-center justify-center p-4 text-center hover:shadow-lg transition-shadow cursor-pointer ${
                    locationSize === size.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setLocationSize(size.id)}
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base font-medium">{size.name}</CardTitle>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!locationSize}>
              Next: Select Service
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Choose Service */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Select a Cleaning Service</h2>
            <p className="text-muted-foreground text-center sm:text-left">
              Choose the type of cleaning that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className={`relative hover:shadow-lg transition-shadow cursor-pointer group ${
                    selectedService === service.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-primary">
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Duration:</span>
                        <span className="font-medium">{service.baseHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="font-medium">{service.priceRange}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <Card>
            <CardHeader>
              <CardTitle>Optional Add-ons</CardTitle>
              <CardDescription>
                Enhance your cleaning service with these optional extras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                {addOns.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <Card
                      key={addon.id}
                      className={`relative flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "ring-2 ring-primary bg-primary/10" : ""
                      }`}
                      onClick={() => {
                        setSelectedAddons((prev) =>
                          isSelected
                            ? prev.filter((id) => id !== addon.id)
                            : [...prev, addon.id]
                        );
                      }}
                    >
                      <div>
                        <p className="font-medium text-sm">{addon.name}</p>
                        <p className="text-xs text-muted-foreground">
                          +{addon.hours}h Estimated
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{addon.price}</Badge>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)} disabled={!selectedService}>
              Next: Select Address
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Select Address */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Select your Address</h2>
            <p className="text-muted-foreground text-center sm:text-left">
              Where should we send the cleaner?
            </p>
          </div>

          {user && addressesData && !showNewAddressForm ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-stretch">
                {addressesData.myAddresses.map((address: any) => (
                  <Card
                    key={address.id}
                    className={`cursor-pointer ${selectedAddress?.id === address.id ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <CardContent className="p-4">
                      <p className="font-medium">{address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.postalCode}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" onClick={() => setShowNewAddressForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </div>
          ) : (
            <Card>
              <CardContent className="py-6">
                <GoogleMapsAutocomplete onAddressSelect={handleAddressSelect} />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => setStep(4)} disabled={!selectedAddress}>
              Next: Schedule
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Schedule */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Schedule your Cleaning</h2>
            <p className="text-muted-foreground text-center sm:text-left">
              Choose a date and time that works for you.
            </p>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-4 sm:py-6 md:flex-row md:justify-center lg:justify-start">
              <div className="w-full md:w-auto flex justify-center">
                <DayPickerCalendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full md:w-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button onClick={handleFindCleaners} disabled={!selectedDate || !selectedTime}>
              Next: Select Cleaner
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Select Cleaner */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Select a Cleaner</h2>
            <p className="text-muted-foreground text-center sm:text-left">
              Choose from our top-rated cleaners.
            </p>
          </div>

          {availableCleanersLoading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Finding available cleaners...
                </h3>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 items-stretch">
              {availableCleanersData?.availableCleaners.map((cleaner: any) => (
                <Card
                  key={cleaner.id}
                  className={`cursor-pointer ${selectedCleaner?.id === cleaner.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedCleaner(cleaner)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={cleaner.user.avatarUrl} />
                        <AvatarFallback>{cleaner.user.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{cleaner.user.displayName}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span>{cleaner.averageRating?.toFixed(1) ?? "New"} ({cleaner.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge>{cleaner.tier}</Badge>
                    <p className="text-lg font-semibold mt-2">{cleaner.hourlyRate / 100} RON/hour</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(4)}>
              Back
            </Button>
            <Button onClick={() => setStep(6)} disabled={!selectedCleaner}>
              Next: Confirm Booking
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

        {/* Step 6: Confirm Booking */}
        {step === 6 && (
          <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">Confirm your Booking</h2>
                        <p className="text-muted-foreground text-center sm:text-left">
                          Review your booking details below and confirm to proceed.
                        </p>
                      </div>    
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getBookingSummary() ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span>{getBookingSummary()?.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location Size:</span>
                      <span>{getBookingSummary()?.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span>{getBookingSummary()?.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{getBookingSummary()?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{getBookingSummary()?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cleaner:</span>
                      <span>{getBookingSummary()?.cleaner}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>{getBookingSummary()?.totalPrice.toFixed(2)} RON</span>
                    </div>
                  </div>
                ) : (
                  <p>Could not load booking summary.</p>
                )}
              </CardContent>
            </Card>
            <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(5)}>
                Back
                </Button>
                <Button onClick={handleConfirmBooking} disabled={createBookingLoading}>
                {createBookingLoading ? "Booking..." : "Confirm Booking & Pay"}
                </Button>
            </div>
          </div>
        )}
    </div>
  );
}
