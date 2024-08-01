import { SearchHistoryType, StudentType } from "../types";

import { GroupPostTypeWGroupInfo } from "../types/group/Post";
import { GroupsResponse } from "../services/groups";
import { SEARCH_CATEGORY } from "../enums/search";
import { atom } from "jotai";

export const searchQueryAtom = atom<string>("");
export const searchHistoryAtom = atom<SearchHistoryType[]>([]);
export const showAllHistoryAtom = atom<boolean>(false);
export const studentsResultsAtom = atom<StudentType[]>([]);
export const groupsResultsAtom = atom<GroupsResponse['getAll']['data']['groups']>([]);
export const groupPostsResultsAtom = atom<GroupPostTypeWGroupInfo[]>([]);
export const searchCategoryAtom = atom<SEARCH_CATEGORY>(SEARCH_CATEGORY.ALL);