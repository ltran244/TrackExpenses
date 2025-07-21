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
  pgm.createTable('tags', {
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
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('now()')
    }
  });
  pgm.addConstraint('tags', 'tags_name_check', 'CHECK (trim(name) != \'\')');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('tags');
};
