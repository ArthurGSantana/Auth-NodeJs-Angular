const list = list => {
  return {
    async add(key, value, dateExp) {
      await list.set(key, value);
      list.expireAt(key, dateExp);
    },

    async getValue(key) {
      return list.get(key);
    },

    async checkKey(key) {
      const result = await list.exists(key);

      return result === 1;
    },

    async delete(key) {
      await list.del(key);
    }
  }
}