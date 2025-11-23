"use client"

import React, { useMemo } from "react"
import { Avatar } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

interface AuthorType {
  email: string
  name: string
}

interface CustomAvatarProps {
  author: AuthorType
  className?: string
  size?: "xs" | "sm" | "md" | "lg"
  showTooltip?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CustomerAvatarProps extends CustomAvatarProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserAvatarProps extends CustomAvatarProps {}

// Fallback hash function for server-side compatibility
function simpleHash(input: string, seed = 0) {
  let hash = seed;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Gradient generation utility functions
function getGradientColors(input: string): string[] {
  const colors: string[] = [];
  
  // Generate 4 different RGB colors from the hash
  for (let i = 0; i < 4; i++) {
    // Use fallback hash for better server-side compatibility
    const colorHash = simpleHash(input + i.toString(), i);
    
    // Extract RGB values from the hash
    const r = (colorHash >> 16) & 255;
    const g = (colorHash >> 8) & 255;
    const b = colorHash & 255;
    
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
}

function createGradientStyle(input: string): React.CSSProperties {
  const colors = getGradientColors(input);

  return {
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    backgroundColor: colors[0],
    backgroundImage: `
      radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
      radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
      radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
      radial-gradient(at 29% 88%, ${colors[0]} 0px, transparent 50%)
    `,
  };
}

function getSizeClasses(size: "xs" | "sm" | "md" | "lg"): string {
  switch (size) {
    case "xs":
      return "h-4 w-4 text-xs font-light text-[10px]"
    case "sm":
      return "h-6 w-6 text-xs"
    case "md":
      return "h-8 w-8 text-sm"
    case "lg":
      return "h-12 w-12 text-base"
    default:
      return "h-8 w-8 text-sm"
  }
}

function getRoundedClasses(size: "xs" | "sm" | "md" | "full"): string {
  switch (size) {
    case "xs":
      return "rounded-sm"
    case "sm":
      return "rounded-sm"
    case "md":
      return "rounded-md"
    case "full":
      return "rounded-full"
    default:
      return "rounded-full"
  }
}

interface AvatarGradientProps {
  identifier: string
  name: string
  rounded: "md" | "sm" | "xs" | "full"
  className?: string
}

function AvatarGradient({
  identifier,
  name,
  rounded,
  className,
}: AvatarGradientProps) {
  const initials = useMemo(() => getInitials(name), [name]);
  const gradientStyle = useMemo(() => createGradientStyle(identifier), [identifier]);
  const roundedClasses = getRoundedClasses(rounded);

  return (
    <>
      <span
        className={cn("aspect-square size-full", className, roundedClasses)}
        style={gradientStyle}
      />
      <span className={cn("absolute inset-0 flex size-full items-center justify-center text-white font-medium backdrop-blur-sm inset-shadow-[0_0_0_1px_rgba(0,0,0,0.1)] text-shadow-xs", roundedClasses)}>
        {initials}
      </span>
    </>
  );
}

export function CustomerAvatar({
  author,
  className,
  size = "md",
  showTooltip = true
}: CustomerAvatarProps) {
  const sizeClasses = getSizeClasses(size);

  const avatarElement = (
    <Avatar className={cn(sizeClasses, className)}>
      <AvatarGradient identifier={author.email} name={author.name} rounded="full" />
    </Avatar>
  );

  if (showTooltip) {
    return (
      <div title={`${author.name} (${author.email})`}>
        {avatarElement}
      </div>
    );
  }

  return avatarElement;
}

export function UserAvatar({
  author,
  className,
  size = "md",
  showTooltip = true
}: UserAvatarProps) {
  const sizeClasses = getSizeClasses(size);
  const rounded = size === "lg" ? "md" : size;
  const roundedClasses = getRoundedClasses(rounded);

  const avatarElement = (
    <Avatar className={cn(sizeClasses, className, roundedClasses)}>
      <AvatarGradient identifier={author.email} name={author.name} rounded={rounded} />
    </Avatar>
  );

  if (showTooltip) {
    return (
      <div title={`${author.name} (${author.email})`}>
        {avatarElement}
      </div>
    );
  }

  return avatarElement;
}