"use client";

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type AdminTabsProps = {
  tabs: Tab[];
  defaultValue: string;
};

export function AdminTabs({ tabs, defaultValue }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (isDesktop) {
    return (
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  return (
    <div className="w-full">
      <Select value={activeTab} onValueChange={onTabChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {tabs.map((tab) => (
            <SelectItem key={tab.value} value={tab.value}>
              {tab.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-6">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
