/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('transactions', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    },
    categoryId: {
      type: 'uuid',
      notNull: true,
      references: '"categories"',
      onDelete: 'cascade'
    },
    payMethodId: {
      type: 'uuid',
      notNull: true,
      references: '"payMethods"',
      onDelete: 'cascade'
    },
    name: {
      type: 'varchar(50)',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()')
    },
    amount: {
      type: 'numeric',
      notNull: true
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()')
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('transactions');
};
