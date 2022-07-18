let app = new Vue({
  el: '#app',
  data: {
    errorMessage: "",
    inputsC: {
      rows: 9,
      columns: 9,
      bombs: 10,
    },
    selectedPreset: "easy",
    presets: [
      {
        name: "customized",
        disabled: "true",
        hidden: "true",
      },
      {
        name: "easy",
        rows: 9,
        columns: 9,
        bombs: 10,
      },
      {
        name: "middle",
        rows: 16,
        columns: 16,
        bombs: 40,
      },
      {
        name: "hard",
        rows: 16,
        columns: 30,
        bombs: 99,
      },
    ],
    game: {
      bombsIndexes: [],
      cells: [],
      rows: 9,
      columns: 9,
      bombs: 10,
    }
  },
  computed: {
    inputs: function () {
      return {
        rows: Number(this.inputsC.rows),
        columns: Number(this.inputsC.columns),
        bombs: Number(this.inputsC.bombs),
      };
    },
    inputCellCount: function () {
      return this.inputs.rows * this.inputs.columns;
    },
    inputBombDensity: function () {
      return (this.inputs.bombs / this.inputCellCount * 100);
    },

    bombsPlace: function () {

    },

    styles: function () {
      return {
        boardStyle: {
          "font-size": "xx-small",
        },
        boardCellStyle: {
          "height": "19px",
          "width": "19px",
          "text-align": "center",
        },
      };
    },
  },
  methods: {
    inputChange: function () {
      let matchedPresets = this.presets.filter(
        v => v.name !== "customized"
          && Object.keys(this.inputs).every(name => this.inputs[name] === v[name])
      );
      if (matchedPresets.length) {
        this.selectedPreset = matchedPresets[0].name;
      } else {
        this.selectedPreset = "customized";
      }
    },
    presetChange: function () {
      let selectedPreset = this.presets.filter(p => p.name === this.selectedPreset)[0];
      Object.keys(this.inputsC).map(name => this.inputsC[name] = selectedPreset[name]);
    },
    reset: function () {
      this.errorMessage = "";
      if (this.inputCellCount <= this.inputs.bombs) {
        this.errorMessage = "Too Many Bombs!";
        return;
      }
      Object.keys(this.inputs).map(name => this.game[name] = this.inputs[name]);
      this.game.bombsIndexes = [];
      this.game.cells = Array(this.game.rows)
        .fill(Array(this.game.columns)
          .fill({opened:0,sus:0}));
    },
    boardClicked: function (e) {
      let cellData = this.getCellData(e.target);
      // now cellData = clicked cells { row:rowIndex, col:colIndex, opened:(0 or 1) }

      // todo: implements the open process

      d = cellData; // todo: for debugging
      console.log(d); // todo: for debugging
    },
    boardContext: function(e){ // right click
      e.preventDefault(); // block context menu
      let cellData = this.getCellData(e.target);

      // todo: implements the flagging or open-around-all process

      d = cellData; // todo: for debugging
      console.log(d); // todo: for debugging
    },
    getCellData: function (td){ // input td in game-board then return { row:rowIndex, col:colIndex, opened:(0 or 1) }
      return Array.from(td.attributes)
        .filter(v => ~v.name.indexOf('data-'))
        .reduce((p, v) => {
          p[v.name.replace("data-", "")] = Number(v.value);
          return p;
        }, {});
    },
  },
  mounted: function () {
    // get parameters
    this.reset();
  }
});
