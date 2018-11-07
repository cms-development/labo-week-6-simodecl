<?php

namespace Drupal\university;

use Drupal\Core\Entity\ContentEntityStorageInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\university\Entity\CourseInterface;

/**
 * Defines the storage handler class for Course entities.
 *
 * This extends the base storage class, adding required special handling for
 * Course entities.
 *
 * @ingroup university
 */
interface CourseStorageInterface extends ContentEntityStorageInterface {

  /**
   * Gets a list of Course revision IDs for a specific Course.
   *
   * @param \Drupal\university\Entity\CourseInterface $entity
   *   The Course entity.
   *
   * @return int[]
   *   Course revision IDs (in ascending order).
   */
  public function revisionIds(CourseInterface $entity);

  /**
   * Gets a list of revision IDs having a given user as Course author.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The user entity.
   *
   * @return int[]
   *   Course revision IDs (in ascending order).
   */
  public function userRevisionIds(AccountInterface $account);

  /**
   * Counts the number of revisions in the default language.
   *
   * @param \Drupal\university\Entity\CourseInterface $entity
   *   The Course entity.
   *
   * @return int
   *   The number of revisions in the default language.
   */
  public function countDefaultLanguageRevisions(CourseInterface $entity);

  /**
   * Unsets the language for all Course with the given language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   */
  public function clearRevisionsLanguage(LanguageInterface $language);

}
