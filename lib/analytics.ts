import posthog from "posthog-js";

/**
 * Centralized analytics tracking for the docs site.
 * All PostHog events go through here for easy maintenance.
 * In development, calls are no-ops since PostHog isn't initialized.
 */

export function trackComponentViewed(component: string) {
  posthog.capture("component_viewed", { component });
}

export function trackComponentInstalled(component: string) {
  posthog.capture("component_installed", { component });
}

export function trackCliCommandCopied(command: string, component?: string) {
  posthog.capture("cli_command_copied", { command, component });
}

export function trackDocsSearch(query: string) {
  posthog.capture("docs_search_performed", { query });
}
