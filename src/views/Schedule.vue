<template>
  <div class="schedule">
    <ScheduleHeader
      @date-range="setDateRange"
      @sort-key="setSortKey"
      @sort-order="setSortOrder"
    />
    <ScheduleTable :reservations="sorted" />
  </div>
</template>
<script>
import * as _ from "lodash";
import RESERVE from "../../public/json/reserve.json";
import ScheduleHeader from "../components/ScheduleHeader.vue";
import ScheduleTable from "../components/ScheduleTable.vue";
export default {
  name: "schedule",
  components: {
    ScheduleHeader,
    ScheduleTable,
  },
  data: () => {
    return {
      reserveData: RESERVE.reserve,
      dateRange: null,
      sortKey: null,
      sortOrder: null,
    };
  },
  methods: {
    setDateRange(value) {
      //valueの値は順番が決まっていない
      //絞り込み期間の日付を昇順で並べ替えておく
      this.dateRange = _.sortBy(value);
    },
    setSortKey(value) {
      this.sortKey = value.value;
    },
    setSortOrder(value) {
      this.sortOrder = value.value;
    },
  },
  computed: {
    limited() {
      if (this.dateRange && this.dateRange.length === 1) {
        //絞り込み期間の日付が一つしか指定がない場合
        //日付が一致するものだけ絞り込む
        const filtered = _.filter(this.reserveData, [
          "date",
          this.dateRange[0],
        ]);
        return filtered;
      } else if (this.dateRange && this.dateRange.length > 1) {
        //絞り込み期間の日付に開始日と終了日がある場合
        const start = this.dateRange[0];
        const end = this.dateRange[1];
        const filtered = _.filter(this.reserveData, function (o) {
          return o.date >= start && o.date <= end;
        });
        return filtered;
      }
      return this.reserveData;
    },
    sorted() {
      if (this.sortKey && this.sortOrder) {
        const sorted = _.orderBy(this.limited, this.sortKey, this.sortOrder);
        return sorted;
      }
      return this.limited;
    },
  },
};
</script>