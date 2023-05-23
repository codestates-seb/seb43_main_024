import { create } from 'zustand';
import axios from 'axios';

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
    console.log(url);
    try {
      set({ isLoading: true, currentPage: page });
      const { pageSize } = get();
      const response = await axios.get(`${url}page=${page}&size=${pageSize}`);
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
      const response = await axios.get(`${url}`);
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
  data: [],
  getData: async (tilId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/til/${tilId}`
      );
      const { data } = response;
      set({ data: data });
    } catch (error) {
      console.error(`데이터를 가져오는 중에 오류가 발생했습니다:`, error);
      set({ isLoading: false });
    }
  },
  updateData: async (tilId, updatedData) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/til/${tilId}`,
        updatedData
      );
    } catch (error) {
      console.error(`데이터 수정 중에 오류가 발생했습니다:`, error);
    }
  },
  deleteData: async (tilId) => {
    try {
      console.log(tilId);
      await axios.delete(`${process.env.REACT_APP_API_URL}/til/${tilId}`);
      set({ data: [] });
    } catch (error) {
      console.error(`데이터 삭제 중에 오류가 발생했습니다:`, error);
    }
  },
}));
