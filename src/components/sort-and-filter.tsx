import { Flex, Select, Portal, createListCollection } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "@/context/tasks-context";
import type { TaskStatus } from "@/graphql/reactiveVars";

const STATUS_ITEMS = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];
const SORT_ITEMS = [
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
];

const statusCollection = createListCollection({
  items: [{ value: "", label: "All" }, ...STATUS_ITEMS],
});
const sortCollection = createListCollection({
  items: [{ value: "", label: "Default" }, ...SORT_ITEMS],
});

const isTaskStatus = (val: string | null | undefined): val is TaskStatus =>
  val === "PENDING" || val === "IN_PROGRESS" || val === "DONE";

export default function SortAndFilter() {
  const { status, sortBy, setStatus, setSortBy } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlSortBy = searchParams.get("sortBy") || undefined;
    if ((urlStatus || "") !== (status || ""))
      setStatus(isTaskStatus(urlStatus) ? urlStatus : undefined);
    if ((urlSortBy || "") !== (sortBy || "")) setSortBy(urlSortBy || undefined);
  }, []);

  // When context changes, update URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (sortBy) params.sortBy = sortBy;
    setSearchParams(params, { replace: true });
  }, [status, sortBy]);

  return (
    <Flex gap={2} align="center">
      <Select.Root
        collection={statusCollection}
        width="140px"
        value={status ? [status] : [""]}
        onValueChange={(e) => {
          const val = Array.isArray(e.value) ? e.value[0] : e.value;
          setStatus(isTaskStatus(val) ? val : undefined);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>Status</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="All" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {statusCollection.items.map((item) => (
                <Select.Item item={item} key={item.value || "all"}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Select.Root
        collection={sortCollection}
        width="140px"
        value={sortBy ? [sortBy] : [""]}
        onValueChange={(e) => {
          const val = Array.isArray(e.value) ? e.value[0] : e.value;
          setSortBy(val || undefined);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>Sort By</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Default" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {sortCollection.items.map((item) => (
                <Select.Item item={item} key={item.value || "default"}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Flex>
  );
}
