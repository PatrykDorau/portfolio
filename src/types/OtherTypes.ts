type GlitchEffect = {
  preGlitch: string;
  glitch: string;
  preText?: string;
  postText?: string;
  customClass?: string;
  play: boolean;
};

type NavbarItem = {
  title: string;
  scrollId: string;
  active: boolean;
  index: number;
};

type ProjectItemData = {
  data: ProjectsListItem;
};

type ProjectsListItem = {
  title: string;
  id: number;
  videoPath: string;
  stack: string;
  team: string;
  description: string;
  active: boolean;
};

export type { GlitchEffect, NavbarItem, ProjectsListItem, ProjectItemData };
