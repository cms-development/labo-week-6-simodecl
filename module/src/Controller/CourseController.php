<?php

namespace Drupal\university\Controller;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Url;
use Drupal\university\Entity\CourseInterface;

/**
 * Class CourseController.
 *
 *  Returns responses for Course routes.
 */
class CourseController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * Displays a Course  revision.
   *
   * @param int $course_revision
   *   The Course  revision ID.
   *
   * @return array
   *   An array suitable for drupal_render().
   */
  public function revisionShow($course_revision) {
    $course = $this->entityManager()->getStorage('course')->loadRevision($course_revision);
    $view_builder = $this->entityManager()->getViewBuilder('course');

    return $view_builder->view($course);
  }

  /**
   * Page title callback for a Course  revision.
   *
   * @param int $course_revision
   *   The Course  revision ID.
   *
   * @return string
   *   The page title.
   */
  public function revisionPageTitle($course_revision) {
    $course = $this->entityManager()->getStorage('course')->loadRevision($course_revision);
    return $this->t('Revision of %title from %date', ['%title' => $course->label(), '%date' => format_date($course->getRevisionCreationTime())]);
  }

  /**
   * Generates an overview table of older revisions of a Course .
   *
   * @param \Drupal\university\Entity\CourseInterface $course
   *   A Course  object.
   *
   * @return array
   *   An array as expected by drupal_render().
   */
  public function revisionOverview(CourseInterface $course) {
    $account = $this->currentUser();
    $langcode = $course->language()->getId();
    $langname = $course->language()->getName();
    $languages = $course->getTranslationLanguages();
    $has_translations = (count($languages) > 1);
    $course_storage = $this->entityManager()->getStorage('course');

    $build['#title'] = $has_translations ? $this->t('@langname revisions for %title', ['@langname' => $langname, '%title' => $course->label()]) : $this->t('Revisions for %title', ['%title' => $course->label()]);
    $header = [$this->t('Revision'), $this->t('Operations')];

    $revert_permission = (($account->hasPermission("revert all course revisions") || $account->hasPermission('administer course entities')));
    $delete_permission = (($account->hasPermission("delete all course revisions") || $account->hasPermission('administer course entities')));

    $rows = [];

    $vids = $course_storage->revisionIds($course);

    $latest_revision = TRUE;

    foreach (array_reverse($vids) as $vid) {
      /** @var \Drupal\university\CourseInterface $revision */
      $revision = $course_storage->loadRevision($vid);
      // Only show revisions that are affected by the language that is being
      // displayed.
      if ($revision->hasTranslation($langcode) && $revision->getTranslation($langcode)->isRevisionTranslationAffected()) {
        $username = [
          '#theme' => 'username',
          '#account' => $revision->getRevisionUser(),
        ];

        // Use revision link to link to revisions that are not active.
        $date = \Drupal::service('date.formatter')->format($revision->getRevisionCreationTime(), 'short');
        if ($vid != $course->getRevisionId()) {
          $link = $this->l($date, new Url('entity.course.revision', ['course' => $course->id(), 'course_revision' => $vid]));
        }
        else {
          $link = $course->link($date);
        }

        $row = [];
        $column = [
          'data' => [
            '#type' => 'inline_template',
            '#template' => '{% trans %}{{ date }} by {{ username }}{% endtrans %}{% if message %}<p class="revision-log">{{ message }}</p>{% endif %}',
            '#context' => [
              'date' => $link,
              'username' => \Drupal::service('renderer')->renderPlain($username),
              'message' => ['#markup' => $revision->getRevisionLogMessage(), '#allowed_tags' => Xss::getHtmlTagList()],
            ],
          ],
        ];
        $row[] = $column;

        if ($latest_revision) {
          $row[] = [
            'data' => [
              '#prefix' => '<em>',
              '#markup' => $this->t('Current revision'),
              '#suffix' => '</em>',
            ],
          ];
          foreach ($row as &$current) {
            $current['class'] = ['revision-current'];
          }
          $latest_revision = FALSE;
        }
        else {
          $links = [];
          if ($revert_permission) {
            $links['revert'] = [
              'title' => $this->t('Revert'),
              'url' => $has_translations ?
              Url::fromRoute('entity.course.translation_revert', ['course' => $course->id(), 'course_revision' => $vid, 'langcode' => $langcode]) :
              Url::fromRoute('entity.course.revision_revert', ['course' => $course->id(), 'course_revision' => $vid]),
            ];
          }

          if ($delete_permission) {
            $links['delete'] = [
              'title' => $this->t('Delete'),
              'url' => Url::fromRoute('entity.course.revision_delete', ['course' => $course->id(), 'course_revision' => $vid]),
            ];
          }

          $row[] = [
            'data' => [
              '#type' => 'operations',
              '#links' => $links,
            ],
          ];
        }

        $rows[] = $row;
      }
    }

    $build['course_revisions_table'] = [
      '#theme' => 'table',
      '#rows' => $rows,
      '#header' => $header,
    ];

    return $build;
  }

}
