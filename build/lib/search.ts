"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { SearchResultOrders } from "./types";

export async function taskSearch(
  long: number | null,
  lat: number | null,
  rad: number | null,
  term: string | null,
  from: number,
  to: number
) {
  const supabase = createClient();
  if (rad == 0) {
    const { data, error } = await supabase
      .rpc("search_tasks_remoteterm", {
        search_term: term ? term : "",
      })
      .select("*")
      .range(from, to)
      .returns<SearchResultOrders[]>();
    console.log(error);
    if (error) {
      console.log(error);
      throw Error("Error fetching search tasks");
    }

    return data;
  }

  if (long && lat && rad && term) {
    const { data, error } = await supabase
      .rpc("search_tasks_all", {
        long: long,
        lat: lat,
        radius: rad,
        search_term: term,
      })
      .select("*")
      .range(from, to)
      .returns<SearchResultOrders[]>();

    if (error) {
      console.log(error);
      throw Error("Error fetching search tasks");
    }

    return data;
  } else if (long && lat && rad) {
    const { data, error } = await supabase
      .rpc("search_tasks_location", {
        long: long,
        lat: lat,
        radius: rad,
      })
      .select("*")
      .range(from, to)
      .returns<SearchResultOrders[]>();

    if (error) {
      console.log(error);
      throw Error("Error fetching search tasks");
    }

    return data;
  } else if (term) {
    const { data, error } = await supabase
      .rpc("search_tasks_term", {
        search_term: term,
      })
      .select("*")
      .range(from, to)
      .returns<SearchResultOrders[]>();
    if (error) {
      console.log(error);
      throw Error("Error fetching search tasks");
    }

    return data;
  }
  const { data, error } = await supabase
    .rpc("search_tasks_empty", {})
    .select("*")
    .range(from, to)
    .returns<SearchResultOrders[]>();
  if (error) {
    console.log(error);
    throw Error("Error fetching search tasks");
  }

  return data;
}
