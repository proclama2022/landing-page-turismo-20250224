import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={`grid gap-2 ${className}`}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={`h-4 w-4 rounded-full border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-blue-600" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem }; 