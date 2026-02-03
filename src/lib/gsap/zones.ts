export const ZONES = {
  SKY: { id: 1, name: "sky", start: 0, end: 800 },
  SKYLINE: { id: 2, name: "skyline", start: 800, end: 2400 },
  MIDLEVELS: { id: 3, name: "midlevels", start: 2400, end: 4500 },
  STREET: { id: 4, name: "street", start: 4500, end: 6800 },
  GROUND: { id: 5, name: "ground", start: 6800, end: 8000 },
} as const;

export const TOTAL_HEIGHT = 8000;

export type ZoneId = (typeof ZONES)[keyof typeof ZONES]["id"];
export type ZoneName = (typeof ZONES)[keyof typeof ZONES]["name"];

export function getZoneByPosition(scrollY: number): ZoneId {
  if (scrollY < ZONES.SKY.end) return ZONES.SKY.id;
  if (scrollY < ZONES.SKYLINE.end) return ZONES.SKYLINE.id;
  if (scrollY < ZONES.MIDLEVELS.end) return ZONES.MIDLEVELS.id;
  if (scrollY < ZONES.STREET.end) return ZONES.STREET.id;
  return ZONES.GROUND.id;
}

export function getZoneProgress(scrollY: number, zoneId: ZoneId): number {
  const zone = Object.values(ZONES).find((z) => z.id === zoneId);
  if (!zone) return 0;

  const clampedY = Math.max(zone.start, Math.min(scrollY, zone.end));
  return (clampedY - zone.start) / (zone.end - zone.start);
}

export function getScrollProgress(scrollY: number): number {
  return Math.min(1, Math.max(0, scrollY / TOTAL_HEIGHT));
}
