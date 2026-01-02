CREATE TABLE public.outbox (
    id serial PRIMARY KEY,
    event_id uuid NOT NULL UNIQUE,
    event_type text NOT NULL,
    aggregate_id uuid NOT NULL,
    payload jsonb NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    processed_at timestamp
);

CREATE INDEX idx_outbox_id_processed_at_null ON public.outbox(id)
WHERE processed_at IS NULL;
