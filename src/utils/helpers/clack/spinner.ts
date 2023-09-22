import kleur from "kleur";
import { spinner } from '@clack/prompts';

export function loadingSpinner() {
    const s = spinner();


    return {
        // @ts-expect-error
        add: (id="start",{text = "working..."}) => {
            s.start(kleur.yellow(text));
        },
        // @ts-expect-error
        succeed: (id="succeed",{text = "task success"}) => {
            s.stop(kleur.green(text),0);
        },
        // @ts-expect-error
        fail: (id = "fail", { text = "task fail" }) => {
            s.stop(kleur.red(text),1);
        },
        // @ts-expect-error
        print_success: (id = "print_succeed", { text = "task success" }) => {
            s.start(kleur.yellow(text));
            s.stop(kleur.green(text), 1);
        },
        // @ts-expect-error
        print_error: (id = "print_fail", { text = "task fail" }) => {
            s.start(kleur.yellow(text));
            s.stop(kleur.red(text), 0);
        }
    }
}
