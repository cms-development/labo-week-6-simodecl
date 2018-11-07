<?php

namespace Drupal\university;

use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
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
class CourseStorage extends SqlContentEntityStorage implements CourseStorageInterface {

  /**
   * {@inheritdoc}
   */
  public function revisionIds(CourseInterface $entity) {
    return $this->database->query(
      'SELECT vid FROM {course_revision} WHERE id=:id ORDER BY vid',
      [':id' => $entity->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function userRevisionIds(AccountInterface $account) {
    return $this->database->query(
      'SELECT vid FROM {course_field_revision} WHERE uid = :uid ORDER BY vid',
      [':uid' => $account->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function countDefaultLanguageRevisions(CourseInterface $entity) {
    return $this->database->query('SELECT COUNT(*) FROM {course_field_revision} WHERE id = :id AND default_langcode = 1', [':id' => $entity->id()])
      ->fetchField();
  }

  /**
   * {@inheritdoc}
   */
  public function clearRevisionsLanguage(LanguageInterface $language) {
    return $this->database->update('course_revision')
      ->fields(['langcode' => LanguageInterface::LANGCODE_NOT_SPECIFIED])
      ->condition('langcode', $language->getId())
      ->execute();
  }

}
