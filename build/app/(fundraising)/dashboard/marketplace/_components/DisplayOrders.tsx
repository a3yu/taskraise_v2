"use client";
import React, { useEffect, useState } from "react";

import { taskSearch } from "@/lib/search";
import { Button } from "@/components/ui/button";
import { SearchResultOrders } from "@/lib/types";
import OrderCardOrder from "../../_components/OrderCardOrder";

function DisplayTasks({
  tasks,
  searchParams,
}: {
  tasks: SearchResultOrders[];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [tickets, setTickets] = useState<SearchResultOrders[]>(tasks);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_COUNT = 30; // Number of tickets per page

  useEffect(() => {
    loadTickets();
  }, [currentPage, searchParams]);

  const loadTickets = async () => {
    setIsLoading(true);
    const from = currentPage * PAGE_COUNT;
    const to = from + PAGE_COUNT;

    const newTickets = await taskSearch(
      searchParams.lat ? parseFloat(searchParams.lat as string) : null,
      searchParams.long ? parseFloat(searchParams.long as string) : null,
      searchParams.radius
        ? searchParams.radius === "remote"
          ? 0
          : parseFloat(searchParams.radius as string)
        : null,
      searchParams.term ? (searchParams.term as string) : null,
      from,
      to - 1
    );

    setTickets(newTickets || []);
    setHasMore(newTickets.length === PAGE_COUNT);
    setIsLoading(false);
  };

  const handlePreviousPage = () => {
    if (!isLoading && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const Placeholder = ({ text }: { text: string }) => (
    <div className="flex justify-center items-center h-24 bg-gray-100 border border-gray-300 rounded-lg">
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );

  return (
    <div>
      {tickets.length > 0 ? (
        <div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
            {tickets.map((task) => (
              <OrderCardOrder order={task} key={task.id} variant="open" />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {currentPage > 0 && (
              <Button
                onClick={handlePreviousPage}
                disabled={!hasMore || isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Loading..." : "Previous Page"}
              </Button>
            )}
            {hasMore && (
              <Button
                onClick={handleNextPage}
                disabled={!hasMore || isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Loading..." : "Next Page"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Placeholder text="No tasks at the moment." />
      )}
    </div>
  );
}

export default DisplayTasks;
