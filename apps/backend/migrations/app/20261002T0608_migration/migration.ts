#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4c9a83ef910fafd8bbc0c5bfb490532ff43b362bafe8135a0d265023f8c67762/contract';
import endContract from '../../snapshots/4c9a83ef910fafd8bbc0c5bfb490532ff43b362bafe8135a0d265023f8c67762/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Avatar',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'AvatarImage',
        columns: [
          col('avatarId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'AvatarVideo',
        columns: [
          col('duration', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('endFrame', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('height', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('prompt', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startFrame', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('width', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'AvatarVideoReference',
        columns: [
          col('avatarId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('avatarVideoId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Avatar',
        index: 'Avatar_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'AvatarImage',
        index: 'AvatarImage_avatarId_idx_14b51a84',
        columns: ['avatarId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'AvatarVideo',
        index: 'AvatarVideo_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'AvatarVideoReference',
        index: 'AvatarVideoReference_avatarId_idx_14b51a84',
        columns: ['avatarId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'AvatarVideoReference',
        index: 'AvatarVideoReference_avatarVideoId_idx_f4e58f10',
        columns: ['avatarVideoId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Avatar',
        foreignKey: {
          name: 'Avatar_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AvatarImage',
        foreignKey: {
          name: 'AvatarImage_avatarId_fkey',
          columns: ['avatarId'],
          references: { schema: 'public', table: 'Avatar', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AvatarVideo',
        foreignKey: {
          name: 'AvatarVideo_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AvatarVideoReference',
        foreignKey: {
          name: 'AvatarVideoReference_avatarId_fkey',
          columns: ['avatarId'],
          references: { schema: 'public', table: 'Avatar', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AvatarVideoReference',
        foreignKey: {
          name: 'AvatarVideoReference_avatarVideoId_fkey',
          columns: ['avatarVideoId'],
          references: { schema: 'public', table: 'AvatarVideo', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
