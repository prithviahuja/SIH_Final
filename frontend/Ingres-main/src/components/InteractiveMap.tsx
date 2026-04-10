'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Popup, ZoomControl } from 'react-leaflet'
import geoData from '@/DATA/geoJson/india-states.json'
import { GroundwaterData, SelectedRegion } from '@/types'
import type { Map, LeafletMouseEvent, Layer, GeoJSON as LeafletGeoJSON } from 'leaflet'

interface StateSummary {
  [key: string]: {
    overExploited: number;
    critical: number;
    semiCritical: number;
    safe: number;
    saline: number;
    totalBlocks: number;
  }
}

interface InteractiveMapProps {
  view: string
  onRegionSelect: (region: SelectedRegion) => void
  groundwaterData: GroundwaterData[]
  allDistrictsData: GeoJSON.FeatureCollection
}

const getStatusColor = (status: string) => {
  const colors = {
    'safe': '#10b981',
    'semi-critical': '#3b82f6',
    'critical': '#f59e0b',
    'over-exploited': '#ef4444',
    'saline': '#8b5cf6',
    'hilly': '#6b7280',
    'no-data': '#374151'
  }
  return colors[status as keyof typeof colors] || '#6b7280'
}

const getDominantStatus = (data: { totalBlocks?: number; totalResult?: number; overExploited?: number; critical?: number; semiCritical?: number; safe?: number; }) => {
    if (!data) return 'no-data';
    const total = data.totalBlocks || data.totalResult || 0;
    if (total === 0) return 'no-data';

    const { overExploited = 0, critical = 0, semiCritical = 0, safe = 0 } = data;
    const maxVal = Math.max(overExploited, critical, semiCritical, safe);
    if (maxVal === overExploited && maxVal > 0) return 'over-exploited';
    if (maxVal === critical && maxVal > 0) return 'critical';
    if (maxVal === semiCritical && maxVal > 0) return 'semi-critical';
    if (maxVal === safe && maxVal > 0) return 'safe';
    return 'no-data';
}

export default function InteractiveMap({ view, onRegionSelect, groundwaterData, allDistrictsData }: InteractiveMapProps) {
  const mapRef = useRef<Map>(null)
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [districtData, setDistrictData] = useState<GeoJSON.FeatureCollection | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [stateSummaryData, setStateSummaryData] = useState<StateSummary>({})

  useEffect(() => {
    if (groundwaterData.length > 0) {
      const summary = groundwaterData.reduce((acc, item) => {
        const state = item.state ? item.state.toUpperCase() : 'UNKNOWN';
        if (!acc[state]) {
          acc[state] = {
            overExploited: 0,
            critical: 0,
            semiCritical: 0,
            safe: 0,
            saline: 0,
            totalBlocks: 0,
          };
        }
        acc[state].totalBlocks += 1;
        const category = item.categorization ? item.categorization.toLowerCase().replace(/ /g, '').replace(/-/g, '').replace('_', '') : '';
        if (category === 'overexploited') {
            acc[state].overExploited += 1;
        } else if (category === 'critical') {
            acc[state].critical += 1;
        } else if (category === 'semicritical') {
            acc[state].semiCritical += 1;
        } else if (category === 'safe') {
            acc[state].safe += 1;
        } else if (category === 'saline') {
            acc[state].saline += 1;
        }
        return acc;
      }, {});
      setStateSummaryData(summary);
    }
  }, [groundwaterData]);

  useEffect(() => {
    // Process state data only when no state is selected
    if (!selectedState && Object.keys(stateSummaryData).length > 0) {
      // Merge groundwater data with GeoJSON
      const features = (geoData as GeoJSON.FeatureCollection).features.map((feature: GeoJSON.Feature) => {
        const stateName = feature.properties?.NAME_1;
        if (stateName) {
          const summary = stateSummaryData[stateName.toUpperCase()];
          if (summary) {
            feature.properties.status = getDominantStatus(summary);
          }
        }
        return feature;
      });
      setGeoJsonData({ type: "FeatureCollection", features } as GeoJSON.FeatureCollection);
      setDistrictData(null); // Clear district data
    }
  }, [selectedState, stateSummaryData]);

  const handleStateClick = (stateName: string) => {
    if (allDistrictsData) {
      const districtsOfStateFeatures = allDistrictsData.features
        .filter((feature: GeoJSON.Feature) => feature.properties && feature.properties.NAME_1 && feature.properties.NAME_1.toUpperCase() === stateName.toUpperCase())
        .map((feature: GeoJSON.Feature) => {
          const districtName = feature.properties.NAME_2;
          const districtInfo = groundwaterData.find(d => d.district && d.district.toUpperCase() === districtName.toUpperCase());
          if (districtInfo) {
            feature.properties.status = districtInfo.categorization?.toLowerCase().replace(/ /g, '-').replace(/_/g, '-');
          } else {
            feature.properties.status = 'no-data';
          }
          return feature;
        });

      const districtsOfState: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: districtsOfStateFeatures
      };

      setSelectedState(stateName);
      setGeoJsonData(null); // Clear state data
      setDistrictData(districtsOfState);
    }
  };

  const style = (feature: GeoJSON.Feature) => {
    const status = feature.properties?.status
    return {
      fillColor: getStatusColor(status),
      weight: 3,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.8,
      dashArray: '3'
    }
  }

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    const stateName = feature.properties?.NAME_1
    if (stateName) {
      const summary = stateSummaryData[stateName.toUpperCase()];
      
      if (summary) {
        layer.on({
          click: (e: LeafletMouseEvent) => {
          const layer = e.target as LeafletGeoJSON;
          handleStateClick(stateName);
          if (typeof layer.getBounds === 'function') {
            mapRef.current?.fitBounds(layer.getBounds());
          }
          // Pass a consistent data structure to the DataPanel
          const regionData: SelectedRegion = { 
            name: stateName, 
            ...summary, 
            status: getDominantStatus(summary),
            isDistrict: false
          };
          onRegionSelect(regionData);
        },
        mouseover: (e: LeafletMouseEvent) => {
          const layer = e.target
          layer.setStyle({
            fillOpacity: 0.95,
            weight: 4,
            color: '#ffffff'
          })
        },
        mouseout: (e: LeafletMouseEvent) => {
          const layer = e.target
          layer.setStyle({
            fillOpacity: 0.8,
            weight: 3,
            color: '#ffffff'
          })
        }
      })

      layer.bindPopup(`
        <div class="p-4 bg-white rounded-lg shadow-lg border-0">
          <h3 class="font-bold text-lg mb-3 text-gray-800">${stateName}</h3>
          <div class="space-y-2 text-sm">
            <p><span class="font-semibold text-gray-600">Total Blocks:</span> <span class="text-blue-600 font-medium">${summary.totalBlocks}</span></p>
            <p><span class="font-semibold text-gray-600">Over-Exploited:</span> <span class="text-red-600 font-medium">${summary.overExploited}</span></p>
            <p><span class="font-semibold text-gray-600">Critical:</span> <span class="text-yellow-600 font-medium">${summary.critical}</span></p>
            <p><span class="font-semibold text-gray-600">Semi-Critical:</span> <span class="text-blue-600 font-medium">${summary.semiCritical}</span></p>
            <p><span class="font-semibold text-gray-600">Safe:</span> <span class="text-green-600 font-medium">${summary.safe}</span></p>
          </div>
          <button id="view-details-${stateName.replace(/\s/g, '_')}" class="mt-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105">
            View Details
          </button>
        </div>
      `);

      // Add event listener after the popup is opened
      layer.on('popupopen', () => {
        const button = document.getElementById(`view-details-${stateName.replace(/\s/g, '_')}`);
        if (button) {
          button.onclick = () => {
            handleStateClick(stateName);
            if (mapRef.current && typeof (layer as LeafletGeoJSON).getBounds === 'function') {
              mapRef.current.fitBounds((layer as LeafletGeoJSON).getBounds());
            }
          };
        }
      });
      }
    }
  }

  const onEachDistrictFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    const districtName = feature.properties?.NAME_2;
    const districtInfo = groundwaterData.find(d => d.district && d.district.toUpperCase() === districtName.toUpperCase());

    layer.on({
      click: () => {
        if (districtInfo) {
          onRegionSelect({ ...districtInfo, name: districtName, isDistrict: true, status: districtInfo.categorization });
        }
      },
      mouseover: (e: LeafletMouseEvent) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.95,
          weight: 4,
          color: '#ffffff'
        });
      },
      mouseout: (e: LeafletMouseEvent) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.8,
          weight: 3,
          color: '#ffffff'
        });
      }
    });
    if (districtInfo) {
      layer.bindPopup(`
        <div class="p-4 bg-white rounded-lg shadow-lg border-0">
          <h3 class="font-bold text-lg mb-3 text-gray-800">${districtName}</h3>
          <div class="space-y-2 text-sm">
            <p><span class="font-semibold text-gray-600">Status:</span> <span class="font-medium">${districtInfo.categorization}</span></p>
          </div>
        </div>
      `);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      'safe': 'bg-green-100 text-green-800',
      'semi-critical': 'bg-blue-100 text-blue-800',
      'critical': 'bg-yellow-100 text-yellow-800',
      'over-exploited': 'bg-red-100 text-red-800'
    }
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
  }

  const resetView = () => {
    setSelectedState(null)
    // No need to explicitly set map view here, useEffect will trigger state data fetch
    mapRef.current.setView([23.5937, 78.9629], 5);
  }

  return (
    <div className="map-container relative overflow-hidden rounded-xl h-full">
      {selectedState && (
        <button
          onClick={resetView}
          className="absolute top-20 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-white/20 z-[1000] text-black"
        >
          Back to India
        </button>
      )}
      <MapContainer
        ref={mapRef}
        center={[23.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        doubleClickZoom={false} // Disable default double-click zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && !selectedState && (
          <GeoJSON
            key="states"
            data={geoJsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
        {districtData && selectedState && (
          <GeoJSON
            key={selectedState} // Use selectedState as key to force re-render
            data={districtData}
            style={style}
            onEachFeature={onEachDistrictFeature}
          />
        )}
        <ZoomControl position="topright" />
      </MapContainer>

      {/* Enhanced Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20 z-[1000]">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">Groundwater Status</h3>
        <div className="space-y-3 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Safe</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Semi-Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Over-Exploited</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Saline</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-500 mr-3 shadow-sm"></div>
            <span className="font-medium">Hilly Area</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-700 mr-3 shadow-sm"></div>
            <span className="font-medium">No Data</span>
          </div>
        </div>
      </div>

      {/* Assessment Year Badge */}
      <div className="absolute top-4 right-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl px-4 py-2 shadow-lg z-[1000]">
        <p className="text-sm font-bold">
          Assessment Year: 2024-2025
        </p>
      </div>

      {/* Water Drop Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-75 animation-delay-2000"></div>
      </div>
    </div>
  )
}
