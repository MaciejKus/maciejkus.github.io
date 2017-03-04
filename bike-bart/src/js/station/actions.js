export const updateDstStation = (s) => ({
    type: 'UPDATE_DST_STATION',
    name: s.name,
    abbr: s.abbr,
    lat: s.lat,
    lng: s.lng,
    address: s.address
});

export const updateOrgStation = (s) => ({
    type: 'UPDATE_ORG_STATION',
    name: s.name,
    abbr: s.abbr,
    lat: s.lat,
    lng: s.lng,
    address: s.address
});

export const waitOrgStation = () => ({
  type: 'WAIT_ORG_STATION'
});

export const waitDstStation = () => ({
  type: 'WAIT_DST_STATION'
});
