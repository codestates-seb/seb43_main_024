import { create } from 'zustand';
import API from '../../API';

export const useTilListStore = create((set, get) => ({
  data: [],
  isLoading: false,
  currentPage: 1,
  pageSize: 16,
  totalElements: 0,
  totalPages: 0,
  startPage: 0,
  endPage: 0,

  fetchData: async (page, url) => {
    try {
      set({ isLoading: true, currentPage: page });
      const { pageSize } = get();
      const response = await API.get(`${url}page=${page}&size=${pageSize}`);
      //cards(틸 리스트), 전체 틸 숫자, 전체페이지번호, 시작페이지번호, 끝나는페이지번호(페이지가 5페이지씩 나눠옴)
      const { cards, totalElements, totalPages, startPage, endPage } =
        response.data;
      console.log(cards);
      set({
        data: cards,
        totalElements,
        totalPages,
        endPage,
        startPage,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        `${page}페이지 데이터를 가져오는 중에 오류가 발생했습니다:`,
        error
      );
      set({ isLoading: false });
    }
  },
  //현재 페이지 정보를 업데이트
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
}));

export const useHotTilListStore = create((set) => ({
  data: [],
  isLoading: false,
  getHotTilData: async (url) => {
    try {
      const response = await API.get(`${url}`);
      const { cards } = response.data;
      const sortedCards = cards.sort((a, b) => b.tilViewCount - a.tilViewCount);
      const hotTilCards = sortedCards.slice(0, 30);
      set({ data: hotTilCards });
    } catch (error) {
      console.error(`데이터를 가져오는 중에 오류가 발생했습니다:`, error);
      set({ isLoading: false });
    }
  },
}));

export const useTilStore = create((set) => ({
  data: null,
  getData: async (tilId) => {
    try {
      const response = await API.get(
        `${process.env.REACT_APP_API_URL}/til/${tilId}`
      );
      const data = response.data;
      set({ data: data });
      return data;
    } catch (error) {
      console.error(`데이터를 가져오는 중에 오류가 발생했습니다: `, error);
      return null;
    }
  },
  updateData: async (tilId, updatedData) => {
    try {
      await API.put(
        `${process.env.REACT_APP_API_URL}/til/${tilId}`,
        updatedData
      );
      console.log(updatedData);
      set({ data: updatedData });
    } catch (error) {
      console.error(`데이터 수정 중에 오류가 발생했습니다:`, error);
    }
  },
  deleteData: async (tilId) => {
    try {
      console.log(tilId);
      await API.delete(`${process.env.REACT_APP_API_URL}/til/${tilId}`);
      set({ data: [] });
    } catch (error) {
      console.error(`데이터 삭제 중에 오류가 발생했습니다:`, error);
    }
  },
}));

export const useBookmarkStore = create((set) => ({
  bookmarksData: [],
  getBookmarkData: async (memberId) => {
    try {
      const response = await API.get(
        `${process.env.REACT_APP_API_URL}/members/${memberId}/bookmark`
      );
      const { bookmarks } = response.data;
      set({ bookmarksData: bookmarks });
      return bookmarks;
    } catch (error) {
      console.error(`데이터를 가져오는 중에 오류가 발생했습니다: `, error);
      return null;
    }
  },

  getCheckBookmarkData: async (memberId, tilId) => {
    console.log(tilId);
    try {
      const response = await API.get(
        `${process.env.REACT_APP_API_URL}/members/${memberId}/bookmark`
      );
      const { bookmarks } = response.data;
      set({ bookmarksData: bookmarks });
      return bookmarks;
    } catch (error) {
      console.error(`데이터를 가져오는 중에 오류가 발생했습니다: `, error);
      return null;
    }
  },

  addBookmarkData: async (memberId, tilId) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/bookmark/member/${memberId}/til/${tilId}`;

      await API.post(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`데이터 수정 중에 오류가 발생했습니다:`, error);
    }
  },
  deleteData: async (bookmarkId) => {
    try {
      await API.delete(
        `${process.env.REACT_APP_API_URL}/bookmark/${bookmarkId}`
      );
    } catch (error) {
      console.error(`데이터 삭제 중에 오류가 발생했습니다:`, error);
    }
  },
}));

export const useMyTilStore = create((set, get) => ({
  data: [],
  isLoading: false,
  currentPage: 1,
  pageSize: 12,
  totalElements: 0,
  totalPages: 0,
  startPage: 0,
  endPage: 0,

  myTilData: async (page, url) => {
    console.log(url);
    try {
      set({ isLoading: true, currentPage: page });
      const { pageSize } = get();
      const response = await API.get(`${url}?page=${page}&size=${pageSize}`);
      const { cards, totalElements, totalPages, startPage, endPage } =
        response.data;
      set({
        data: cards,
        totalElements,
        totalPages,
        endPage,
        startPage,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        `${page}페이지 데이터를 가져오는 중에 오류가 발생했습니다:`,
        error
      );
      set({ isLoading: false });
    }
  },
  //현재 페이지 정보를 업데이트
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
}));
