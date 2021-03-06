const Mutations = {
  async createItem(parent, args, ctx, info) {
    const { title, description, price, image, largeImage } = args;
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        title,
        description,
        price,
        image,
        largeImage
      },
      info
    });

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      },
      info
    });
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. Find the item
    const item = await ctx.db.query.item({ where }, `{ id  title }`);
    // 2. Check if they own that item, or have the permissions
    // TODO
    // 3. Delete item
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
