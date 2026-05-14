"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";

interface TabData {
  label: string;
  value: string;
  icon?: string;
  content: React.ReactNode;
}

interface VercelTabsProps {
  tabs: TabData[];
  defaultTab?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  contentClassName?: string;
}

export function VercelTabs({ tabs, defaultTab, value, onValueChange, className, contentClassName }: VercelTabsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [internalTab, setInternalTab] = useState(defaultTab || tabs[0]?.value);
  
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalTab;
  
  const handleTabChange = (newValue: string) => {
    if (!isControlled) {
      setInternalTab(newValue);
    }
    onValueChange?.(newValue);
  };
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const activeElement = tabRefs.current[activeIndex];
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, [activeIndex]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={`flex w-full flex-col ${className || ""}`}
    >
      <TabsList className="relative h-auto self-center select-none gap-1.5 bg-transparent p-0">
        <div
          className="absolute top-0 left-0 flex h-7.5 items-center rounded-md bg-white/10 transition-all duration-300 ease-out"
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />
        <div
          className="absolute -bottom-1.5 h-0.5 bg-white transition-all duration-300 ease-out"
          style={activeStyle}
        />
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`z-10 h-7.5 cursor-pointer rounded-md border-0 bg-transparent px-3 py-2 outline-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${
              activeTab === tab.value ? "text-white" : "text-white/50"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap font-medium text-sm leading-5">
              {tab.icon && <Icon icon={tab.icon} width="14" />}
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={`flex flex-col w-full ${contentClassName ?? "mt-8 px-4"}`}>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="fade-in-50 w-full animate-in duration-500 outline-none data-[state=active]:flex data-[state=active]:flex-col data-[state=active]:flex-1 data-[state=active]:min-h-0"
          >
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}