import { GroupPostType, GroupType, SearchHistoryType, StudentType } from "../types";

import { GroupsResponse } from "../services/groups";
import { SEARCH_CATEGORY } from "../enums/search";
import { atom } from "jotai";

export const searchQueryAtom = atom<string>("");
export const searchHistoryAtom = atom<SearchHistoryType[]>([]);
export const showAllHistoryAtom = atom<boolean>(false);
export const studentsResultsAtom = atom<StudentType[]>([]);
export const groupsResultsAtom = atom<GroupsResponse['getAll']['data']['groups']>([]);
export const groupPostsResultsAtom = atom<GroupPostType[]>([]);
export const searchCategoryAtom = atom<SEARCH_CATEGORY>(SEARCH_CATEGORY.ALL);