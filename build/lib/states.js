"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var states_exports = {};
__export(states_exports, {
  InverterStates: () => InverterStates,
  UpdateIntervalID: () => UpdateIntervalID
});
module.exports = __toCommonJS(states_exports);
var import_modbus_types = require("./modbus/modbus_types");
var import_state_enums = require("./state_enums");
const MAX_GAP = 30;
const MAX_BLOCKLENGTH = 110;
var UpdateIntervalID = /* @__PURE__ */ ((UpdateIntervalID2) => {
  UpdateIntervalID2[UpdateIntervalID2["INTIAL"] = 0] = "INTIAL";
  UpdateIntervalID2[UpdateIntervalID2["HIGH"] = 1] = "HIGH";
  UpdateIntervalID2[UpdateIntervalID2["LOW"] = 2] = "LOW";
  return UpdateIntervalID2;
})(UpdateIntervalID || {});
class InverterStates {
  constructor(adapter) {
    this.fetchBlocks = /* @__PURE__ */ new Map();
    this.adapter = adapter;
    this.dataFields = [
      {
        interval: 0 /* INTIAL */,
        state: { id: "info.model", name: "Model", type: "string", role: "info.name" },
        register: { reg: 3e4, type: import_modbus_types.ModbusDatatype.string, length: 15 }
      },
      {
        interval: 0 /* INTIAL */,
        state: { id: "info.modelID", name: "Model ID", type: "number", role: "info.hardware" },
        register: { reg: 30070, type: import_modbus_types.ModbusDatatype.uint16, length: 1 }
      },
      {
        interval: 0 /* INTIAL */,
        state: { id: "info.serialNumber", name: "Serial number", type: "string", role: "info.serial" },
        register: { reg: 30015, type: import_modbus_types.ModbusDatatype.string, length: 10 }
      },
      {
        interval: 0 /* INTIAL */,
        state: { id: "info.ratedPower", name: "Rated power", type: "number", unit: "W", role: "value.power" },
        register: { reg: 30073, type: import_modbus_types.ModbusDatatype.int32, length: 2 }
      },
      {
        interval: 0 /* INTIAL */,
        state: { id: "info.numberMPPTrackers", name: "Number of MPP trackers", type: "number", unit: "", role: "value" },
        register: { reg: 30072, type: import_modbus_types.ModbusDatatype.uint16, length: 1, gain: 1 }
      },
      {
        interval: 1 /* HIGH */,
        state: { id: "activePower", name: "Active power", type: "number", unit: "W", role: "value.power.active", desc: "Power currently used" },
        register: { reg: 32080, type: import_modbus_types.ModbusDatatype.int32, length: 2 }
      },
      {
        interval: 1 /* HIGH */,
        state: { id: "inputPower", name: "Input power", type: "number", unit: "W", role: "value.power.produced", desc: "Power from PV" },
        register: { reg: 32064, type: import_modbus_types.ModbusDatatype.int32, length: 2 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "peakActivePowerCurrenDay", name: "Peak active power of current day", type: "number", unit: "W", role: "value.power" },
        register: { reg: 32078, type: import_modbus_types.ModbusDatatype.int32, length: 2 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "efficiency", name: "Efficiency", type: "number", unit: "%", role: "value" },
        register: { reg: 32086, type: import_modbus_types.ModbusDatatype.uint16, length: 1, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "internalTemperature", name: "Internal temperature", type: "number", unit: "\xB0C", role: "value.temperature" },
        register: { reg: 32087, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "deviceStatus", name: "Device status", type: "string", unit: "", role: "info.status" },
        register: { reg: 32089, type: import_modbus_types.ModbusDatatype.uint16, length: 1 },
        mapper: (value) => Promise.resolve(import_state_enums.InverterStatus[value])
      },
      {
        interval: 2 /* LOW */,
        state: { id: "accumulatedEnergyYield", name: "Accumulated energy yield", type: "number", unit: "kWh", role: "value.energy.produced" },
        register: { reg: 32106, type: import_modbus_types.ModbusDatatype.uint32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "dailyEnergyYield", name: "Daily energy yield", type: "number", unit: "kWh", role: "value.energy" },
        register: { reg: 32114, type: import_modbus_types.ModbusDatatype.uint32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "PV1Voltage", name: "PV1 voltage", type: "number", unit: "V", role: "value.voltage" },
        register: { reg: 32016, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "PV1Current", name: "PV1 current", type: "number", unit: "A", role: "value.current" },
        register: { reg: 32017, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "PV2Voltage", name: "PV2 voltage", type: "number", unit: "V", role: "value.voltage" },
        register: { reg: 32018, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "PV2Current", name: "PV2 current", type: "number", unit: "A", role: "value.current" },
        register: { reg: 32019, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "storage.runningState", name: "Running state", type: "string", role: "info.status" },
        register: { reg: 37762, type: import_modbus_types.ModbusDatatype.uint16, length: 1 },
        mapper: (value) => Promise.resolve(import_state_enums.StorageStatus[value])
      },
      {
        interval: 1 /* HIGH */,
        state: { id: "storage.stateOfCharge", name: "State of charge", type: "number", unit: "%", role: "value.battery", desc: "SOC" },
        register: { reg: 37760, type: import_modbus_types.ModbusDatatype.uint16, length: 1, gain: 10 }
      },
      {
        interval: 1 /* HIGH */,
        state: { id: "storage.chargeDischargePower", name: "Charge/Discharge power", desc: "(>0 charging, <0 discharging)", type: "number", unit: "W", role: "value.power" },
        register: { reg: 37765, type: import_modbus_types.ModbusDatatype.int32, length: 2 },
        postUpdateHook: async (adapter2, value) => {
          return Promise.resolve(/* @__PURE__ */ new Map([
            ["storage.chargePower", { id: "storage.chargePower", value: Math.max(0, value) }],
            ["storage.dischargePower", { id: "storage.dischargePower", value: Math.abs(Math.min(0, value)) }]
          ]));
        }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "storage.CurrentDayChargeCapacity", name: "CurrentDayChargeCapacity", type: "number", unit: "kWh", role: "value.energy", desc: "TBD" },
        register: { reg: 37015, type: import_modbus_types.ModbusDatatype.uint32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "storage.CurrentDayDischargeCapacity", name: "CurrentDayDischargeCapacity", type: "number", unit: "kWh", role: "value.energy", desc: "TBD" },
        register: { reg: 37786, type: import_modbus_types.ModbusDatatype.uint32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.meterStatus", name: "Meter status", type: "string", role: "info.status" },
        register: { reg: 37100, type: import_modbus_types.ModbusDatatype.uint16, length: 1 },
        mapper: (value) => Promise.resolve(import_state_enums.MeterStatus[value])
      },
      {
        interval: 1 /* HIGH */,
        state: { id: "grid.activePower", name: "Active power", type: "number", role: "value.power.active", unit: "W", desc: "(>0 feed-in to the power grid, <0: supply from the power grid)" },
        register: { reg: 37113, type: import_modbus_types.ModbusDatatype.int32, length: 2 },
        postUpdateHook: async (adapter2, value) => {
          return Promise.resolve(/* @__PURE__ */ new Map([
            ["grid.feedIn", { id: "grid.feedIn", value: Math.max(0, value) }],
            ["grid.supplyFrom", { id: "grid.supplyFrom", value: Math.abs(Math.min(0, value)) }]
          ]));
        }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.reactivePower", name: "Reactive power", type: "number", role: "value.power.reactive", unit: "W" },
        register: { reg: 37115, type: import_modbus_types.ModbusDatatype.int32, length: 2 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.powerFactor", name: "Power factor", type: "number", role: "value", unit: "" },
        register: { reg: 37117, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 1e3 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.gridFrequency", name: "Grid frequency", type: "number", role: "value.frequency", unit: "Hz" },
        register: { reg: 37118, type: import_modbus_types.ModbusDatatype.int16, length: 1, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase1Voltage", name: "Phase 1 voltage", type: "number", role: "value.voltage", unit: "V", desc: "also L1, or R voltage" },
        register: { reg: 37101, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase2Voltage", name: "Phase 2 voltage", type: "number", role: "value.voltage", unit: "V", desc: "also L2, or S voltage" },
        register: { reg: 37103, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase3Voltage", name: "Phase 3 voltage", type: "number", role: "value.voltage", unit: "V", desc: "also L3, or T voltage" },
        register: { reg: 37105, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 10 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase1Current", name: "Phase 1 current", type: "number", role: "value.current", unit: "A" },
        register: { reg: 37107, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase2Current", name: "Phase 2 current", type: "number", role: "value.current", unit: "A" },
        register: { reg: 37109, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.phase3Current", name: "Phase 3 current", type: "number", role: "value.current", unit: "A" },
        register: { reg: 37111, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: {
          id: "grid.positiveActivePower",
          name: "Positive active power",
          type: "number",
          role: "value.power.active",
          unit: "kWh",
          desc: "Electricity fed by the inverter to the power grid."
        },
        register: { reg: 37119, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 100 }
      },
      {
        interval: 2 /* LOW */,
        state: { id: "grid.reverseActivePower", name: "Reverse active power", type: "number", role: "value.power.active", unit: "kWh", desc: "Power supplied from the power grid." },
        register: { reg: 37121, type: import_modbus_types.ModbusDatatype.int32, length: 2, gain: 100 }
      }
    ];
    this.postFetchUpdateHooks = [
      {
        interval: 1 /* HIGH */,
        hookFn: (adapter2, toUpdate) => {
          const powerGridActive = toUpdate.get("grid.activePower");
          const powerActiveInverter = toUpdate.get("activePower");
          const totalPowerUse = (powerActiveInverter == null ? void 0 : powerActiveInverter.value) - (powerGridActive == null ? void 0 : powerGridActive.value);
          adapter2.log.silly(`PostFetchHook: calculate totalPowerUse ${powerGridActive == null ? void 0 : powerGridActive.value}, ${powerActiveInverter == null ? void 0 : powerActiveInverter.value}, ${totalPowerUse}`);
          const result = /* @__PURE__ */ new Map();
          if (totalPowerUse) {
            result.set("totalPowerUse", { id: "totalPowerUse", value: totalPowerUse });
          }
          return result;
        }
      }
    ];
    const initalBlocks = this.blockFields(0 /* INTIAL */);
    this.fetchBlocks.set(0 /* INTIAL */, initalBlocks);
    adapter.log.info(`Calculated ${initalBlocks.length} fetch blocks for INITIAL registers`);
    for (const block of initalBlocks) {
      adapter.log.debug(`  [${block.Start}-${block.End}]`);
    }
    const highBlocks = this.blockFields(1 /* HIGH */);
    this.fetchBlocks.set(1 /* HIGH */, highBlocks);
    adapter.log.info(`Calculated ${highBlocks.length} fetch blocks for HIGH interval registers`);
    for (const block of highBlocks) {
      adapter.log.debug(`  [${block.Start}-${block.End}]`);
    }
    const lowBlocks = this.blockFields(2 /* LOW */);
    this.fetchBlocks.set(2 /* LOW */, lowBlocks);
    adapter.log.info(`Calculated ${lowBlocks.length} fetch blocks for LOW interval registers`);
    for (const block of lowBlocks) {
      adapter.log.debug(`  [${block.Start}-${block.End}]`);
    }
  }
  blockFields(interval) {
    this.dataFields.sort((a, b) => a.register.reg - b.register.reg);
    const blocks = [];
    let currentBlock = { Start: -1, End: -1, Fields: [] };
    for (const field of this.dataFields) {
      if (field.interval !== interval) {
        continue;
      }
      const startAddr = field.register.reg;
      const endAddr = field.register.reg + field.register.length;
      if (currentBlock.Start == -1) {
        currentBlock.Start = startAddr;
        currentBlock.End = endAddr;
        currentBlock.Fields = [field];
      } else if (startAddr <= currentBlock.End + MAX_GAP) {
        currentBlock.End = endAddr;
        currentBlock.Fields.push(field);
      } else {
        blocks.push(currentBlock);
        currentBlock = { Start: startAddr, End: endAddr, Fields: [field] };
      }
    }
    if (currentBlock.Start !== -1) {
      blocks.push(currentBlock);
    }
    return this.combineBlocks(blocks, MAX_GAP + 5, 1);
  }
  combineBlocks(blocks, gapSize, count) {
    count++;
    if (count > 20) {
      return blocks;
    }
    const combinedBlocks = [];
    let maxBlockLen = 0;
    let i;
    for (i = 0; i < blocks.length - 1; i++) {
      if (blocks[i + 1].Start - blocks[i].End <= gapSize) {
        const blockToAdd = { Start: blocks[i].Start, End: blocks[i + 1].End, Fields: blocks[i].Fields.concat(blocks[i + 1].Fields) };
        const blockLen2 = blockToAdd.End - blockToAdd.Start;
        if (blockLen2 > maxBlockLen) {
          maxBlockLen = blockLen2;
        }
        if (blockLen2 <= maxBlockLen) {
          combinedBlocks.push(blockToAdd);
          i++;
          continue;
        }
      }
      const blockLen = blocks[i].End - blocks[i].Start;
      if (blockLen > maxBlockLen) {
        maxBlockLen = blockLen;
      }
      combinedBlocks.push(blocks[i]);
    }
    if (blocks.length - 1 == i) {
      combinedBlocks.push(blocks[blocks.length - 1]);
    }
    if (maxBlockLen > MAX_BLOCKLENGTH || combinedBlocks.length == 1) {
      if (maxBlockLen > MAX_BLOCKLENGTH) {
        return blocks;
      } else {
        return combinedBlocks;
      }
    }
    return this.combineBlocks(blocks, gapSize + 5, count);
  }
  async createStates(adapter) {
    for (const field of this.dataFields) {
      const state = field.state;
      const description = `${state.desc} (Register: ${field.register.reg})`;
      adapter.extendObject(state.id, {
        type: "state",
        common: {
          name: state.name,
          type: state.type,
          role: state.role,
          unit: state.unit,
          desc: description,
          read: true,
          write: false
        },
        native: {}
      });
    }
  }
  async updateStates(adapter, device, interval) {
    let toUpdate = /* @__PURE__ */ new Map();
    const fetchBlock = this.fetchBlocks.get(interval);
    if (!fetchBlock) {
      throw new Error(`Unsupported interval ${interval}`);
    }
    this.adapter.log.debug(`Fetch data for ${fetchBlock.length} blocks`);
    for (const block of fetchBlock) {
      this.adapter.log.debug(`Fetch data for block [${block.Start}-${block.End}] containing ${block.Fields.length} registers`);
      try {
        const startAddress = block.Start;
        const blockLength = block.End - block.Start;
        const buffer = await device.readRawData(startAddress, blockLength);
        for (const field of block.Fields) {
          const startOffset = (field.register.reg - block.Start) * 2;
          const valueBuffer = buffer.subarray(startOffset, startOffset + field.register.length * 2);
          let value = import_modbus_types.ModbusDatatype.fromBuffer(field.register.type, valueBuffer);
          if (value === void 0) {
            this.adapter.log.error(`Value for register '${field.register.reg}' is undefined!`);
            continue;
          }
          if (field.register.gain) {
            value /= field.register.gain;
          }
          if (field.mapper) {
            value = await field.mapper(value);
          }
          toUpdate.set(field.state.id, { id: field.state.id, value });
          if (field.postUpdateHook) {
            const hookUpdates = await field.postUpdateHook(adapter, value);
            for (const entry of hookUpdates.entries()) {
              toUpdate.set(entry[0], entry[1]);
            }
          }
        }
      } catch (e) {
        adapter.log.warn(`Error while reading block from ${device.getIpAddress()}: [${block.Start}-${block.End}] '' with : ${e}`);
        break;
      }
    }
    toUpdate = this.runPostFetchHooks(adapter, toUpdate, interval);
    return this.updateAdapterStates(adapter, toUpdate);
  }
  runPostFetchHooks(adapter, toUpdate, interval) {
    for (const postFetchHook of this.postFetchUpdateHooks) {
      if (postFetchHook.interval == interval) {
        const hookUpdates = postFetchHook.hookFn(adapter, toUpdate);
        for (const entry of hookUpdates.entries()) {
          toUpdate.set(entry[0], entry[1]);
        }
      }
    }
    return toUpdate;
  }
  async updateAdapterStates(adapter, toUpdate) {
    for (const updateEntry of toUpdate.values()) {
      if (updateEntry.value !== null) {
        await adapter.setStateAsync(updateEntry.id, { val: updateEntry.value, ack: true });
        if (updateEntry.postUpdateHook) {
          await updateEntry.postUpdateHook(adapter, updateEntry.value);
        }
        adapter.log.silly(`Fetched value ${updateEntry.id}, val=[${updateEntry.value}]`);
      }
    }
    return Promise.resolve(toUpdate.size);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InverterStates,
  UpdateIntervalID
});
//# sourceMappingURL=states.js.map
