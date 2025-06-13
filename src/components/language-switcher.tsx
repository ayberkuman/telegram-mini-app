"use client";

import {
  HStack,
  IconButton,
  Portal,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react";

import { useLanguage } from "@/context/language-context";
import { RiGlobalLine } from "react-icons/ri";

const SelectTrigger = () => {
  const select = useSelectContext();

  return (
    <IconButton
      variant="outline"
      bg="white"
      _hover={{
        bg: "gray.100",
        _dark: {
          bg: "gray.900",
        },
      }}
      _dark={{
        bg: "black",
        borderColor: "gray.200",
      }}
      borderBottom="none"
      mb={-1}
      zIndex={10}
      borderBottomRadius={0}
      {...select.getTriggerProps()}
    >
      <RiGlobalLine />
    </IconButton>
  );
};

export const LanguageSwitcher = () => {
  const { changeLanguage, language } = useLanguage();
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      value={[language]}
      onValueChange={(val) => {
        const selected = Array.isArray(val.value) ? val.value[0] : val.value;
        if (selected) changeLanguage(selected);
      }}
      width="min"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                <HStack>{framework.label}</HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "English", value: "en" },
    { label: "Русский", value: "ru" },
    { label: "Türkçe", value: "tr" },
  ],
});
