"use server";
import SearchElements from "./_components/SearchElement";
import { taskSearch } from "@/lib/search";
import DisplayTasks from "./_components/DisplayOrders";

export default async function Marketplace({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const lat = searchParams.lat ? parseFloat(searchParams.lat as string) : null;
  const long = searchParams.long
    ? parseFloat(searchParams.long as string)
    : null;
  const localName = searchParams.localName
    ? (searchParams.localName as string)
    : null;
  const radius = searchParams.radius
    ? searchParams.radius === "remote"
      ? 0
      : parseFloat(searchParams.radius as string)
    : null;

  const term = searchParams.term ? (searchParams.term as string) : null;
  const tasks = await taskSearch(lat, long, radius, term, 0, 29);

  return (
    <div>
      <div>
        <SearchElements
          localNameParam={localName}
          radiusParam={searchParams.radius as string}
        />
        <DisplayTasks tasks={tasks} searchParams={searchParams} />
      </div>
    </div>
  );
}
