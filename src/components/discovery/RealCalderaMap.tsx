"use client";

import React, { useEffect, useRef, useState } from "react";
import type { GeositeItem } from "./CalderaMapModal";
import { ZoomIn, ZoomOut, RotateCcw, Layers, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface RealCalderaMapProps {
  geosites: GeositeItem[];
  selectedGeosite: GeositeItem | null;
  onSelectGeosite: (site: GeositeItem) => void;
}

export default function RealCalderaMap({
  geosites,
  selectedGeosite,
  onSelectGeosite,
}: RealCalderaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [mapType, setMapType] = useState<"voyager" | "satellite">("voyager");
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Center of Lake Toba & Samosir Island
      const tobaCenter: [number, number] = [2.60, 98.78];
      const initialZoom = 10;

      const map = L.map(mapContainerRef.current, {
        center: tobaCenter,
        zoom: initialZoom,
        minZoom: 8,
        maxZoom: 18,
        zoomControl: false, // Custom controls
      });

      // CartoDB Voyager Tile Layer (Clean, luxury travel map)
      const voyagerLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          subdomains: "abcd",
        }
      );

      voyagerLayer.addTo(map);
      tileLayerRef.current = voyagerLayer;

      // Group layer for markers
      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
      setIsMapReady(true);

      // Invalidate size after animation/layout settles
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch Tile Layer between Voyager and Satellite
  const toggleMapType = (type: "voyager" | "satellite") => {
    if (!mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }

      let newLayer;
      if (type === "satellite") {
        newLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            maxZoom: 18,
          }
        );
      } else {
        newLayer = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
            subdomains: "abcd",
          }
        );
      }

      newLayer.addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
      setMapType(type);
    });
  };

  // Render Markers when geosites or selectedGeosite change
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !markersLayerRef.current) return;

    import("leaflet").then((L) => {
      const markersGroup = markersLayerRef.current;
      markersGroup.clearLayers();

      geosites.forEach((site) => {
        const isSelected = selectedGeosite?.id === site.id;

        // Determine badge color based on category
        let badgeColor = "#1a3a34";
        let ringColor = "#c29d59";

        if (site.category === "Geosite Alam") {
          badgeColor = "#059669"; // emerald
        } else if (site.category === "Warisan Budaya") {
          badgeColor = "#b45309"; // amber
        } else if (site.category === "Kriya & Tenun") {
          badgeColor = "#e11d48"; // rose
        } else if (site.category === "Kuliner & Kopi") {
          badgeColor = "#ea580c"; // orange
        }

        // Custom HTML Pin Marker with luxury Batak aesthetics
        const customIcon = L.divIcon({
          className: "custom-caldera-pin",
          html: `
            <div style="position: relative; cursor: pointer; transform: translate(-50%, -100%);">
              <div style="
                background: ${isSelected ? "#c29d59" : badgeColor};
                color: ${isSelected ? "#1a3a34" : "#ffffff"};
                border: 2px solid ${isSelected ? "#ffffff" : ringColor};
                border-radius: 9999px;
                padding: 4px 8px;
                font-family: ui-sans-serif, system-ui, sans-serif;
                font-size: 11px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 4px;
                box-shadow: 0 4px 14px rgba(0,0,0,0.4);
                white-space: nowrap;
                transition: transform 0.2s ease;
                transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
              ">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${isSelected ? "#1a3a34" : "#c29d59"};"></span>
                <span>${site.name.split(" ")[0]} ${site.name.split(" ")[1] || ""}</span>
              </div>
              <div style="
                position: absolute;
                left: 50%;
                bottom: -5px;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid ${isSelected ? "#c29d59" : badgeColor};
              "></div>
            </div>
          `,
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          popupAnchor: [0, -44],
        });

        const marker = L.marker([site.lat, site.lng], { icon: customIcon });

        // Popup Content
        const popupContent = `
          <div style="font-family: sans-serif; min-width: 180px; padding: 2px;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 3px;">
              <span style="font-size: 9px; font-weight: 700; text-transform: uppercase; background: #1a3a34; color: #c29d59; padding: 1px 6px; border-radius: 4px;">
                ${site.category}
              </span>
              ${site.unescoNumber ? `<span style="font-size: 9px; color: #666;">#${site.unescoNumber}</span>` : ""}
            </div>
            <strong style="display: block; font-size: 13px; color: #1a3a34; line-height: 1.3; margin-bottom: 2px;">
              ${site.name}
            </strong>
            <span style="display: block; font-size: 11px; color: #666; margin-bottom: 6px;">
              📍 ${site.subregion}
            </span>
            <div style="font-size: 10.5px; color: #1a3a34; font-weight: 600;">
              ⭐ ${site.rating} (${site.reviews} ulasan) &bull; ${site.ticketPrice}
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          onSelectGeosite(site);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([site.lat, site.lng], 13, { duration: 0.8 });
          }
        });

        markersGroup.addLayer(marker);
      });
    });
  }, [geosites, selectedGeosite, isMapReady, onSelectGeosite]);

  // Center map on selectedGeosite when selected from external panel
  useEffect(() => {
    if (!selectedGeosite || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([selectedGeosite.lat, selectedGeosite.lng], 12.5, {
      duration: 1,
    });
  }, [selectedGeosite]);

  // Zoom / Reset Controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleReset = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([2.60, 98.78], 10, { duration: 1 });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#122421] overflow-hidden">
      {/* Real Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Custom Styles for Leaflet Markers & Popups */}
      <style jsx global>{`
        .custom-caldera-pin {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: #faf8f5 !important;
          color: #1a3a34 !important;
          border-radius: 14px !important;
          border: 1px solid rgba(194, 157, 89, 0.4) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35) !important;
          padding: 4px !important;
        }
        .leaflet-popup-tip {
          background: #faf8f5 !important;
        }
        .leaflet-container {
          font-family: inherit !important;
        }
      `}</style>

      {/* Floating Control Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {/* Layer Switcher (Peta Wisata vs Citra Satelit) */}
        <div className="bg-[#1a3a34]/95 backdrop-blur-md border border-[#c29d59]/40 p-1 rounded-xl shadow-xl flex items-center text-[11px] font-semibold text-white">
          <button
            onClick={() => toggleMapType("voyager")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mapType === "voyager"
                ? "bg-[#c29d59] text-[#1a3a34] shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Peta Wisata</span>
          </button>
          <button
            onClick={() => toggleMapType("satellite")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mapType === "satellite"
                ? "bg-[#c29d59] text-[#1a3a34] shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Citra Satelit</span>
          </button>
        </div>

        {/* Zoom & Reset Buttons */}
        <div className="bg-[#1a3a34]/95 backdrop-blur-md border border-[#c29d59]/40 p-1 rounded-xl shadow-xl flex flex-col gap-1 text-white w-9 items-center">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-white"
            title="Perbesar Peta"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-white"
            title="Perkecil Peta"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-5 h-[1px] bg-white/20 my-0.5" />
          <button
            onClick={handleReset}
            className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-[#c29d59]"
            title="Pusatkan Danau Toba"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real Map Legend (Bottom Left) */}
      <div className="hidden sm:flex absolute bottom-4 left-4 z-20 bg-[#1a3a34]/90 backdrop-blur-md border border-white/20 px-3 py-2 rounded-xl text-[10.5px] items-center gap-3 text-white/90 shadow-xl">
        <span className="font-semibold text-[#c29d59] uppercase tracking-wider">
          Legenda Geosite:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
          <span>Alam</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm" />
          <span>Budaya</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm" />
          <span>Tenun</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shadow-sm" />
          <span>Kopi/Kuliner</span>
        </div>
      </div>
    </div>
  );
}
