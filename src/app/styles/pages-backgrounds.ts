import { PAGES } from 'shared/constants';
import mainPageBgImg from 'shared/images/main-background-image.jpg';

const backgrounds: Partial<Record<PAGES, { bg?: string, filter?: string}>> = {
  [PAGES.MAIN]: {
    bg: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mainPageBgImg}) no-repeat 50% top fixed`,
    // filter: "blur(2px)",
  },
}

export default backgrounds;