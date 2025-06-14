import { Flex, Select, Portal, createListCollection } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "@/context/tasks-context";
import type { TaskStatus } from "@/graphql/reactiveVars";
import { useTranslation } from "react-i18next";

const STATUS_ITEMS = [
  { value: "PENDING", label: "pending" },
  { value: "IN_PROGRESS", label: "inProgress" },
  { value: "DONE", label: "done" },
];
const SORT_ITEMS = [
  { value: "title", label: "title" },
  { value: "status", label: "status" },
];

const statusCollection = createListCollection({
  items: [{ value: "", label: "all" }, ...STATUS_ITEMS],
});
const sortCollection = createListCollection({
  items: [{ value: "", label: "default" }, ...SORT_ITEMS],
});

const isTaskStatus = (val: string | null | undefined): val is TaskStatus =>
  val === "PENDING" || val === "IN_PROGRESS" || val === "DONE";

export default function SortAndFilter() {
  const { status, sortBy, setStatus, setSortBy } = useTasks();
  const { t } = useTranslation();
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
    <Flex
      gap={2}
      align="center"
      smDown={{ flexDirection: "column", width: "100%" }}
    >
      <Select.Root
        collection={statusCollection}
        width="140px"
        smDown={{ width: "100%" }}
        value={status ? [status] : [""]}
        onValueChange={(e) => {
          const val = Array.isArray(e.value) ? e.value[0] : e.value;
          setStatus(isTaskStatus(val) ? val : undefined);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>{t("status")}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText>
              {t(
                statusCollection.items.find(
                  (item) => item.value === (status || "")
                )?.label || "default"
              )}
            </Select.ValueText>
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
                  {t(item.label)}
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
        smDown={{ width: "100%" }}
        value={sortBy ? [sortBy] : [""]}
        onValueChange={(e) => {
          const val = Array.isArray(e.value) ? e.value[0] : e.value;
          setSortBy(val || undefined);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>{t("sortBy")}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText>
              {t(
                sortCollection.items.find(
                  (item) => item.value === (sortBy || "")
                )?.label || "default"
              )}
            </Select.ValueText>
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
                  {t(item.label)}
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
