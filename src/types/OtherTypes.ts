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
  year: string;
  stack: string;
  team: string;
  description: string;
  active: boolean;
  flow?: Flow[];
};

type Flow = {
  title: string;
  text: string;
};

export type { GlitchEffect, NavbarItem, ProjectsListItem, ProjectItemData };
