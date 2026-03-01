export type { DaumPostcodeData };

interface DaumPostcodeData {
  sido: string;
  sigungu: string;
  roadAddress: string;
  zonecode: string;
}
export interface PostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  popupTitle?: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
        onresize?: (size: { width: number; height: number }) => void;
        width?: string | number;
        height?: string | number;
      }) => {
        embed: (element: HTMLElement, options?: { autoClose: boolean }) => void;
      };
    };
  }
}
