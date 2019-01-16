'use strict';

/**
 * Constants
 * Note: Don't import log helper file from utils here
 */

import { pkginfo } from '../utils/pkginfo';
import { undefinedOrNullChained } from '../utils/funcs';

const {
  productName,
  description,
  name,
  author,
  version,
  repository,
  homepage
} = pkginfo;

export const APP_NAME = `${productName}`;

export const APP_VERSION = `${version}`;

export const AUTHOR_EMAIL = undefinedOrNullChained(author, 'email')
  ? author.email
  : null;

export const APP_TITLE = `${description}`;

export const APP_IDENTIFIER = `${name}`;

export const APP_GITHUB_URL = undefinedOrNullChained(repository, 'url')
  ? repository.url.replace(/^git\+|\.git/g, '')
  : null;

export const APP_GITHUB_RELEASES_URL = `${APP_GITHUB_URL}/releases`;

export const APP_WEBSITE = `${homepage}`;
