module.exports = {
  name: 'Convert Timestamp to Date',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/convert_timestamp_to_date_MOD.js',
  },

  subtitle(data) {
    return `Convert ${data.time}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Date'];
  },

  fields: ['time', 'storage', 'varName'],

  html() {
    return `
<div style="float: left; width: 60%; padding-top: 8px;">
  <p><u>Note:</u><br>
  You can convert <b>Unix Timestamp</b> and <b>YouTube Timestamp</b> with this mod (both were tested).</p>
</div>
<br><br><br>

<div style="float: left; width: 70%; padding-top: 8px;">
  <span class="dbminputlabel">Timestamp to Convert</span>
  <input id="time" class="round" type="text" placeholder="e.g. 1522672056">
</div>
<br><br><br><br>

<div>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>
<br><br><br>

<div style="text-align: center; float: left; width: 100%; padding-top: 8px;">
  <p><b>Recommended formats:</b></p>
  <img src="https://i.imgur.com/fZXXgFa.png" alt="Timestamp Formats" />
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const Mods = this.getMods();
    const toDate = Mods.require('normalize-date');
    const time = this.evalMessage(data.time, cache);

    let result;
    if (/^\d+(?:\.\d*)?$/.exec(time)) {
      result = toDate(Number(time).toFixed(3));
    } else {
      result = toDate(time);
    }
    if (result.toString() === 'Invalid Date') result = undefined;

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
