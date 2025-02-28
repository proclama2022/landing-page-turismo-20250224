'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CITY_DATA } from '@/data/cityData';

interface CitySelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function CitySelect({ id, value, onChange }: CitySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Seleziona una città" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(CITY_DATA).map(([city, data]) => (
          <SelectItem key={city} value={city}>
            {city} ({data.province})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 