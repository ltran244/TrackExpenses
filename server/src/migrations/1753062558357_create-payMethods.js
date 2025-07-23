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
  pgm.createTable('payMethods', {
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
    name: {
      type: 'varchar(50)',
      notNull: true
    },
    createdAt:{
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()')
    },
    method:{
      type: 'varchar(6)',
      notNull: true
    }
  });
  pgm.addConstraint('payMethods', 'payMethods_method_check', 'CHECK (method IN (\'cash\', \'card\', \'other\'))');
  pgm.addConstraint('payMethods', 'payMethods_unique_user_method', 'UNIQUE (userId, method)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('payMethods');
};
