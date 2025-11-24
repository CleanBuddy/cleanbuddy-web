"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Edit2, Trash2, Home, Building2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleMapsAutocomplete, { GoogleMapsAddress } from "@/components/google-maps-autocomplete";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - will be replaced with GraphQL query
const mockAddresses = [
  {
    id: "1",
    type: "HOME",
    street: "Strada Victoriei",
    streetNumber: "12",
    building: "",
    apartment: "5A",
    entrance: "B",
    floor: "2",
    city: "Bucharest",
    postalCode: "010024",
    county: "Bucharest",
    country: "Romania",
    latitude: 44.4392,
    longitude: 26.0964,
    isDefault: true,
    additionalInfo: "Ring twice, gate code is 1234",
  },
  {
    id: "2",
    type: "WORK",
    street: "Bulevardul Unirii",
    streetNumber: "45",
    building: "Block C3",
    apartment: "15",
    entrance: "A",
    floor: "7",
    city: "Bucharest",
    postalCode: "030823",
    county: "Bucharest",
    country: "Romania",
    latitude: 44.4268,
    longitude: 26.1025,
    isDefault: false,
    additionalInfo: "",
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<typeof mockAddresses[0] | null>(null);
  const [newAddress, setNewAddress] = useState<GoogleMapsAddress | null>(null);
  const [addressType, setAddressType] = useState<string>("HOME");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [floor, setFloor] = useState("");
  const [building, setBuilding] = useState("");

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "HOME":
        return <Home className="h-4 w-4" />;
      case "WORK":
        return <Building2 className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case "HOME":
        return "Home";
      case "WORK":
        return "Work";
      case "OTHER":
        return "Other";
      default:
        return type;
    }
  };

  const formatAddress = (address: typeof mockAddresses[0]) => {
    const parts = [
      address.street,
      address.streetNumber,
      address.apartment ? `Apt. ${address.apartment}` : "",
      address.city,
      address.postalCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const handleDelete = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  const handleEdit = (address: typeof mockAddresses[0]) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleAddressSelect = (address: GoogleMapsAddress) => {
    setNewAddress(address);
  };

  const handleSaveAddress = () => {
    if (!newAddress) {
      alert("Please select an address from Google Maps");
      return;
    }

    const newAddressData = {
      id: String(addresses.length + 1),
      type: addressType,
      street: newAddress.street,
      streetNumber: newAddress.streetNumber,
      building: building,
      apartment: apartment,
      entrance: entrance,
      floor: floor,
      city: newAddress.city,
      postalCode: newAddress.postalCode,
      county: newAddress.county,
      country: newAddress.country,
      latitude: newAddress.latitude,
      longitude: newAddress.longitude,
      isDefault: setAsDefault || addresses.length === 0,
      additionalInfo: additionalInfo,
    };

    setAddresses((prev) => {
      if (setAsDefault || addresses.length === 0) {
        return [...prev.map((addr) => ({ ...addr, isDefault: false })), newAddressData];
      }
      return [...prev, newAddressData];
    });

    // Reset form
    setNewAddress(null);
    setAddressType("HOME");
    setAdditionalInfo("");
    setSetAsDefault(false);
    setApartment("");
    setEntrance("");
    setFloor("");
    setBuilding("");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Addresses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service locations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Search for your address using Google Maps. We'll automatically fill in all the details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Google Maps Autocomplete Input */}
              <div className="space-y-2">
                <Label htmlFor="address-search">Search Address</Label>
                <GoogleMapsAutocomplete
                  onAddressSelect={handleAddressSelect}
                  placeholder="Start typing your address in Romania..."
                />
                {newAddress && (
                  <Alert className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Selected: {newAddress.formattedAddress}
                    </AlertDescription>
                  </Alert>
                )}
                <p className="text-xs text-muted-foreground">
                  Only addresses in Romania are available. Start typing to see suggestions.
                </p>
              </div>

              {/* Additional Address Details */}
              {newAddress && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm font-medium">Additional Details (Optional)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="building" className="text-xs">Building</Label>
                      <Input
                        id="building"
                        placeholder="e.g., Block C3"
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entrance" className="text-xs">Entrance</Label>
                      <Input
                        id="entrance"
                        placeholder="e.g., A"
                        value={entrance}
                        onChange={(e) => setEntrance(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor" className="text-xs">Floor</Label>
                      <Input
                        id="floor"
                        placeholder="e.g., 2"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment" className="text-xs">Apartment</Label>
                      <Input
                        id="apartment"
                        placeholder="e.g., 5A"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Type */}
              <div className="space-y-2">
                <Label htmlFor="address-type">Address Type</Label>
                <Select value={addressType} onValueChange={setAddressType}>
                  <SelectTrigger id="address-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOME">Home</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Info */}
              <div className="space-y-2">
                <Label htmlFor="additional-info">
                  Additional Instructions (Optional)
                </Label>
                <Textarea
                  id="additional-info"
                  placeholder="e.g., Gate code, parking instructions, how to find the entrance..."
                  rows={3}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              {/* Set as Default */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="set-default"
                  className="rounded border-gray-300"
                  checked={setAsDefault}
                  onChange={(e) => setSetAsDefault(e.target.checked)}
                />
                <Label htmlFor="set-default" className="font-normal cursor-pointer">
                  Set as default address
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAddress} disabled={!newAddress}>
                Save Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">
                Addresses are verified using Google Maps
              </p>
              <p className="text-xs text-blue-700">
                We use Google Maps to ensure accurate locations and help cleaners find your address easily.
                You cannot manually input addresses to maintain data quality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`relative ${
                address.isDefault ? "border-primary" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getAddressTypeIcon(address.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {getAddressTypeLabel(address.type)}
                      </CardTitle>
                      {address.isDefault && (
                        <Badge variant="secondary" className="mt-1">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{formatAddress(address)}</p>
                      {address.additionalInfo && (
                        <p className="text-muted-foreground text-xs mt-1">
                          {address.additionalInfo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Details Table */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
                  {address.entrance && (
                    <div>
                      <span className="text-muted-foreground">Entrance:</span>{" "}
                      <span className="font-medium">{address.entrance}</span>
                    </div>
                  )}
                  {address.floor && (
                    <div>
                      <span className="text-muted-foreground">Floor:</span>{" "}
                      <span className="font-medium">{address.floor}</span>
                    </div>
                  )}
                  {address.building && (
                    <div>
                      <span className="text-muted-foreground">Building:</span>{" "}
                      <span className="font-medium">{address.building}</span>
                    </div>
                  )}
                  {address.apartment && (
                    <div>
                      <span className="text-muted-foreground">Apartment:</span>{" "}
                      <span className="font-medium">{address.apartment}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {!address.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(address)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(address.id)}
                    disabled={address.isDefault}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first address to start booking cleaning services
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Update your address details and additional instructions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Address Type */}
            <div className="space-y-2">
              <Label htmlFor="edit-address-type">Address Type</Label>
              <Select defaultValue={selectedAddress?.type || "HOME"}>
                <SelectTrigger id="edit-address-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address Display (Read-only) */}
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="p-3 bg-muted rounded-md text-sm">
                {selectedAddress && formatAddress(selectedAddress)}
              </div>
              <p className="text-xs text-muted-foreground">
                To change the address location, please delete this address and add a new one.
              </p>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="edit-additional-info">
                Additional Instructions (Optional)
              </Label>
              <Textarea
                id="edit-additional-info"
                placeholder="e.g., Gate code, parking instructions, how to find the entrance..."
                defaultValue={selectedAddress?.additionalInfo || ""}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
