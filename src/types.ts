export interface GanttTask {
  id: string;
  name: string;
  start: string;
  end: string;
  progress?: number;
  dependencies?: string;
  projectName?: string;
  projectNumber?: string;
  scheduleDescription?: string;
}

export interface GanttOptions {
  // View and layout options
  view_mode?: "Day" | "Week" | "Month" | "Year";
  view_mode_select?: boolean;
  column_width?: number;
  container_height?: number | "auto";

  // Bar appearance
  bar_height?: number;
  bar_corner_radius?: number;
  padding?: number;

  // Header options
  upper_header_height?: number;
  lower_header_height?: number;

  // Date and time options
  date_format?: string;
  snap_at?: string;
  scroll_to?: "today" | "start" | "end" | string;

  // Readonly options
  readonly?: boolean;
  readonly_progress?: boolean;
  readonly_dates?: boolean;

  // Interactive features
  move_dependencies?: boolean;
  auto_move_label?: boolean;
  infinite_padding?: boolean;

  // Progress and display
  show_expected_progress?: boolean;
  today_button?: boolean;

  // Grid lines
  lines?: "none" | "vertical" | "horizontal" | "both";

  // Popup configuration
  popup_on?: "click" | "hover";
  custom_popup_html?: null | ((task: GanttTask) => string);
  popup?: (popupData: {
    task: GanttTask;
    chart: object;
    get_title: () => HTMLElement;
    get_subtitle: () => HTMLElement;
    get_details: () => HTMLElement;
    set_title: (html: string) => void;
    set_subtitle: (html: string) => void;
    set_details: (html: string) => void;
    add_action: (html: string, func: () => void) => void;
  }) => string | undefined | false;

  // Arrows and dependencies
  arrow_curve?: number;

  // Holidays and ignored periods
  holidays?: Record<string, string | string[]>;
  ignore?: string[];

  // Localization
  language?: string;
}
