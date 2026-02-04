export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  folder: 'wedding-invitation/zones',
};

export const zoneImagePaths = {
  z01: {
    sky: 'z01-sky/night_sky',
    cloud_a: 'z01-sky/cloud_wisps_01',
    cloud_b: 'z01-sky/cloud_wisps_02',
  },
  z02: {
    skyline_far: 'z02-skyline/skyline_far_silhouette',
    towers: 'z02-skyline/skyline_mid_towers',
    building_left: 'z02-skyline/building_close_left',
    building_right: 'z02-skyline/building_close_right',
    haze: 'z02-skyline/haze_band',
    windows: 'z02-skyline/window_glow_overlay',
    transition: 'z02-skyline/building_corridor',
  },
  z03: {
    buildings: 'z03-midlevels/midlevel_buildings_bg',
    escalator: 'z03-midlevels/escalator_structure',
    escalator_glow: 'z03-midlevels/escalator_glow',
    soho: 'z03-midlevels/soho_shopfronts',
    railing: 'z03-midlevels/escalator_railing_fg',
  },
  z04: {
    buildings: 'z04-street/street_buildings_deep',
    neon_far: 'z04-street/neon_layer_back',
    neon_near: 'z04-street/neon_layer_front',
    neon_glow: 'z04-street/neon_glow_map',
    tram: 'z04-street/tram_full',
    tram_light: 'z04-street/tram_headlight',
    taxi: 'z04-street/taxi',
    tracks: 'z04-street/tram_tracks',
    wet_asphalt: 'z04-street/wet_asphalt_reflection',
  },
  z05: {
    stall: 'z05-ground/dai_pai_dong_stall',
    cafe: 'z05-ground/cha_chaan_teng',
    pavement: 'z05-ground/wet_pavement_tiles',
    puddle: 'z05-ground/puddle_base',
    reflection: 'z05-ground/puddle_reflection',
    debris: 'z05-ground/ground_debris_fg',
  },
} as const;
