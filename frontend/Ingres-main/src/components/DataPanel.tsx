'use client'

import { motion } from 'framer-motion'
import { BarChart3, Droplets, TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { SelectedRegion, GroundwaterData } from '@/types'

interface DataPanelProps {
  selectedRegion: SelectedRegion | null
  groundwaterData: GroundwaterData[]
}

export default function DataPanel({ selectedRegion, groundwaterData }: DataPanelProps) {
  // This block handles the UI when no region is selected.
  if (!selectedRegion) {
    const totalUnits = groundwaterData.length;
    const safeUnits = groundwaterData.filter(d => d.categorization && d.categorization.toLowerCase().includes('safe')).length;
    const safePercentage = totalUnits > 0 ? ((safeUnits / totalUnits) * 100).toFixed(1) : 0;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-6 h-full relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Data Panel</h2>
              <p className="text-sm text-gray-600">Select a region on the map</p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Droplets className="w-20 h-20 text-blue-400 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">No Region Selected</h3>
            <p className="text-gray-600 leading-relaxed">
              Click on any state or region on the map to view detailed groundwater data and analysis.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6 mt-8">
            <h3 className="font-bold text-gray-800 text-lg">India Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
              >
                <p className="text-sm text-gray-600 font-medium">Total Assessment Units</p>
                <p className="text-2xl font-bold text-blue-600">{totalUnits.toLocaleString()}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200"
              >
                <p className="text-sm text-gray-600 font-medium">Safe Units</p>
                <p className="text-2xl font-bold text-green-600">{safePercentage}%</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Helper functions for styling based on status
  const getStatusColor = (status: string) => {
    const colors = {
      'safe': 'text-green-600 bg-green-100',
      'semi-critical': 'text-blue-600 bg-blue-100',
      'critical': 'text-yellow-600 bg-yellow-100',
      'over-exploited': 'text-red-600 bg-red-100'
    }
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'over-exploited' || status === 'critical') {
        return <AlertTriangle className="w-5 h-5" />
    }
    return <Droplets className="w-5 h-5" />
  }

  // This block renders the detailed data view when a region is selected.
  const isDistrict = selectedRegion.isDistrict;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 h-full overflow-y-auto relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedRegion.name}</h2>
            <p className="text-sm text-gray-600">Groundwater Assessment Data</p>
          </div>
        </div>

        {/* Status Badge */}
        {selectedRegion.status && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl ${getStatusColor(selectedRegion.status)} mb-6 shadow-lg`}
          >
            {getStatusIcon(selectedRegion.status)}
            <span className="font-bold capitalize text-lg">
              {selectedRegion.status.replace('-', ' ')}
            </span>
          </motion.div>
        )}

        {isDistrict ? (
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold text-gray-600">Assessment Unit:</span> <span className="font-medium">{selectedRegion.assessmentUnitName}</span></p>
            <p><span className="font-semibold text-gray-600">Categorization:</span> <span className="font-medium">{selectedRegion.categorization}</span></p>
            <p><span className="font-semibold text-gray-600">Total Geographical Area:</span> <span className="font-medium">{selectedRegion.totalGeographicalArea}</span></p>
            <p><span className="font-semibold text-gray-600">Total Annual GW Recharge:</span> <span className="font-medium">{selectedRegion.totalAnnualGroundWaterRecharge}</span></p>
            <p><span className="font-semibold text-gray-600">Annual Extractable GW Resource:</span> <span className="font-medium">{selectedRegion.annualExtractableGroundWaterResource}</span></p>
            <p><span className="font-semibold text-gray-600">Total Extraction:</span> <span className="font-medium">{selectedRegion.totalExtraction}</span></p>
            <p><span className="font-semibold text-gray-600">Stage of GW Extraction:</span> <span className="font-medium">{selectedRegion.stageOfGroundWaterExtraction}%</span></p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm"
              >
                <p className="text-sm text-gray-600 font-medium">Total Blocks</p>
                <p className="text-2xl font-bold text-blue-600">{selectedRegion.totalBlocks}</p>
              </motion.div>
            </div>

            {/* Block Distribution */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Block Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Safe</span>
                  </div>
                  <span className="font-semibold">{selectedRegion.safe} ({selectedRegion.totalBlocks > 0 ? ((selectedRegion.safe / selectedRegion.totalBlocks) * 100).toFixed(1) : 0}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Semi-Critical</span>
                  </div>
                  <span className="font-semibold">{selectedRegion.semiCritical} ({selectedRegion.totalBlocks > 0 ? ((selectedRegion.semiCritical / selectedRegion.totalBlocks) * 100).toFixed(1) : 0}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Critical</span>
                  </div>
                  <span className="font-semibold">{selectedRegion.critical} ({selectedRegion.totalBlocks > 0 ? ((selectedRegion.critical / selectedRegion.totalBlocks) * 100).toFixed(1) : 0}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Over-Exploited</span>
                  </div>
                  <span className="font-semibold">{selectedRegion.overExploited} ({selectedRegion.totalBlocks > 0 ? ((selectedRegion.overExploited / selectedRegion.totalBlocks) * 100).toFixed(1) : 0}%)</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
