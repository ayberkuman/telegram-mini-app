import type { Task } from "@/graphql/generated/graphql";
import { Card, Text } from "@chakra-ui/react";

import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function TaskItem({
  item,
  completeItem,
}: {
  item: Task;
  completeItem: (id: string) => void;
}) {
  return (
    <motion.div
      className="flex items-center justify-between gap-1.5 py-8"
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <Card.Root
        css={{
          listStyle: "none",
          height: "100%",
          flexGrow: 1,
        }}
        style={{
          position: "relative",
          borderRadius: "12px",
          width: "100%", // layout resize animation
          backgroundColor: "transparent",
        }}
      >
        <motion.div
          className="flex flex-row items-center p-4 gap-4 h-12 rounded-xl"
          layout="position"
        >
          <Checkbox
            variant="subtle"
            colorPalette="cyan"
            ml={4}
            id={`checkbox-${item.id}`}
            aria-label="Mark as done"
            className="cursor-pointer"
            onChange={() => completeItem(item.id)}
          />
          <Text>{item.title}</Text>
        </motion.div>
      </Card.Root>
    </motion.div>
  );
}
