<?php

declare(strict_types=1);

namespace Shimmie2;

use function MicroHTML\{A, H1, IMG, SMALL, SPAN, joinHTML};
use function MicroHTML\{BODY, DIV, INPUT, META, TITLE, emptyHTML};
use function MicroHTML\{BUTTON, SCRIPT, BR};

use MicroHTML\HTMLElement;

class NyanbooruHomeTheme extends HomeTheme{
    public function build_body(
        string $sitename,
        HTMLElement $main_links,
        ?string $main_text,
        ?string $contact_link,
        int $post_count,
    ): HTMLElement {
        $page = Ctx::$page;
        $page->set_layout("front-page");
        $page->add_html_header(SCRIPT(['src' => '/themes/nyanbooru/script/futa.js', 'type' => 'text/javascript']));

        return BODY(
            $page->body_attrs(),
                    DIV(
                        ["id" => "front-page"],
                        $this->build_title($sitename),
                        $this->build_links($main_links),
                        $this->build_search(),
                        $this->build_message($main_text),
                        $this->build_counter($post_count),
                        $this->build_footer($contact_link, $post_count),
                        $this->build_ralsei()
                    ),
        );
    }

    protected function build_counter(int $post_count): ?HTMLElement
    {
        $base_href = Url::base();
        $counter_digits = [];
        if ($post_count === 0) {
            $counter_digits = [IMG([
                'class' => 'counter-img',
                'alt' => '',
                'src' => "$base_href/ext/home/none.gif"
            ])];
        }
        else{
            $counter_dirs = HomeConfig::get_counter_options();
            $counter_dir = $counter_dirs[array_rand($counter_dirs)];
            if ($counter_dir === 'none' || $counter_dir === 'text-only') {
                return null;
            }
            foreach (str_split((string)$post_count) as $cur) {
                $counter_digits[] = IMG([
                    'class' => 'counter-img',
                    'alt' => $cur,
                    'src' => "$base_href/ext/home/counters/$counter_dir/$cur.gif"
                ]);
            }
        }


        return DIV(["class" => "space", "id" => "counter"], joinHTML('', $counter_digits));
    }

    protected function build_footer(?string $contact_link, int $post_count): HTMLElement
    {
        $num_comma = number_format($post_count);
        return DIV(
            ["class" => "space", "id" => "foot"],
            SMALL(SMALL(
                empty($contact_link)
                ? null
                : emptyHTML(A(["href" => $contact_link], "Contact"), " - "),
                        " Содержит $num_comma постов - ",
                        " Работает на ",
                        A(["href" => "https://github.com/shish/shimmie2/"], "Shimmie2"), BR(),
                        "Авторы сия прикола: ",
                        A(['href' => 'https://topa.мряу.рф/'], 'TOPa'), ', ',
                        A(['href' => 'https://ryzh.pl/'], 'ryzhpolsos')
            ))
        );
    }

    protected function build_ralsei(): HTMLElement{
        $base_href = Url::base();
        return BUTTON(['id' => 'RalseiButton'], IMG(['id' => 'Ralsei', 'src' => "$base_href/themes/nyanbooru/assets/ralsei.png"]));
    }
}
