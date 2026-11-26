"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { MappableDestination } from "@/lib/content";
import { getLocalPhoto } from "@/lib/local-photos";

// A CSS pin (see .map-pin in globals.css)
const pinIcon = L.divIcon({
  className: "map-pin-wrapper",
  html: '<span class="map-pin"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// User location marker
const userLocationIcon = L.divIcon({
  className: "map-user-pin-wrapper",
  html: '<span class="map-user-dot"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

export function HanoiMap({
  points,
  locale = "vi",
  selectedSlug,
  onSelectPoint,
}: {
  points: MappableDestination[];
  locale?: Locale;
  selectedSlug?: string;
  onSelectPoint?: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const m = getMessages(locale);

  // Initialize Map & Markers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      markersRef.current.clear();
    }
    if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
      delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
    }

    const positions = points.map((p) => [p.latitude, p.longitude] as [number, number]);
    const single = positions.length === 1;

    const map = L.map(container, {
      scrollWheelZoom: false,
      center: single ? positions[0] : [21.0285, 105.8542],
      zoom: single ? 15 : 13,
    });

    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Geolocation control
    const locateBtn = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    locateBtn.innerHTML = `
      <a href="#" role="button" title="${locale === "vi" ? "Vị trí của tôi" : "My location"}" class="map-locate-btn" aria-label="${locale === "vi" ? "Vị trí của tôi" : "My location"}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="3"></circle>
          <line x1="12" y1="2" x2="12" y2="5"></line>
          <line x1="12" y1="19" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="5" y2="12"></line>
          <line x1="19" y1="12" x2="22" y2="12"></line>
        </svg>
      </a>
    `;

    L.DomEvent.disableClickPropagation(locateBtn);
    L.DomEvent.on(locateBtn, "click", (e) => {
      e.preventDefault();
      map.locate({ setView: true, maxZoom: 15 });
    });

    const CustomLocateControl = L.Control.extend({
      onAdd: () => locateBtn,
    });
    new CustomLocateControl({ position: "topright" }).addTo(map);

    map.on("locationfound", (e: L.LocationEvent) => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(e.latlng);
      } else {
        userMarkerRef.current = L.marker(e.latlng, { icon: userLocationIcon }).addTo(map);
        userMarkerRef.current.bindPopup(locale === "vi" ? "<strong>Vị trí của bạn</strong>" : "<strong>Your Location</strong>");
      }
      userMarkerRef.current.openPopup();
    });

    map.on("locationerror", () => {
      alert(locale === "vi" ? "Không thể định vị được vị trí của bạn." : "Unable to retrieve your location.");
    });

    // Add Markers
    for (const p of points) {
      const marker = L.marker([p.latitude, p.longitude], {
        icon: pinIcon,
        title: p.name,
        alt: p.name,
      }).addTo(map);

      const photo = getLocalPhoto(p.slug);
      const detailHref = localePath(locale, `/destinations/${p.slug}`);
      const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${p.latitude},${p.longitude}`;

      const popupHtml = `
        <div class="map-popup-card">
          ${photo ? `<div class="map-popup-img-wrap"><img src="${photo.src}" alt="${escapeHtml(p.name)}" class="map-popup-img" /></div>` : ""}
          <div class="map-popup-content">
            <h4 class="map-popup-title">${escapeHtml(p.name)}</h4>
            ${p.ticketInfo ? `<p class="map-popup-badge">${escapeHtml(p.ticketInfo)}</p>` : ""}
            ${p.openingHours ? `<p class="map-popup-hours">${escapeHtml(p.openingHours)}</p>` : ""}
            <div class="map-popup-actions">
              <a href="${detailHref}" class="map-popup-link primary">${escapeHtml(m.common.viewDetails)}</a>
              <a href="${directionsHref}" target="_blank" rel="noopener noreferrer" class="map-popup-link secondary">${locale === "vi" ? "Chỉ đường" : "Directions"}</a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { minWidth: 240, maxWidth: 300, className: "custom-map-popup" });

      marker.on("click", () => {
        onSelectPoint?.(p.slug);
      });

      markersRef.current.set(p.slug, marker);
    }

    // Fit bounds if multiple points
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [40, 40] });
    }

    const markers = markersRef.current;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
      userMarkerRef.current = null;
      if (container && (container as unknown as { _leaflet_id?: number })._leaflet_id) {
        delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
      }
    };
  }, [points, locale, m.common.viewDetails, onSelectPoint]);

  // Focus selected marker if selectedSlug changes
  useEffect(() => {
    if (!selectedSlug || !mapRef.current) return;
    const marker = markersRef.current.get(selectedSlug);
    if (marker) {
      const latLng = marker.getLatLng();
      mapRef.current.flyTo(latLng, 16, { duration: 1 });
      marker.openPopup();
    }
  }, [selectedSlug]);

  return <div ref={containerRef} className="h-[32rem] w-full rounded-[16px] z-0 shadow-sm" />;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
