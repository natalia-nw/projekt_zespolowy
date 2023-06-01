# Djoser auth
Base endpoints: https://djoser.readthedocs.io/en/latest/base_endpoints.html

Token endpoints: https://djoser.readthedocs.io/en/latest/token_endpoints.html

# Items

## GET, POST: /items
*Filtering, ordering, searching available.*

**Permissions**: login required, list only items associated with user (taker/giver).

**Function**: Returns a list of user's items, can add new item. Can make item public.

## GET: /items/public
*Filtering, ordering, searching available.*

**Permissions**: none

**Function**: Returns a list of all public items.

## GET, PUT, PATCH, DELETE: /items/{id}
**Permissions**: login required, unless the item is public.

**Function**: Returns a single editable owner's item or read-only public item.


# Agreements

## GET: /agreements
*Filtering, ordering, searching available.*

**Permissions**: login required, list only agreements associated with item user (taker/giver).

**Function**: Returns list of all agreements, made as taker or giver.

## GET, PUT: /items/{item_id}/agreements/
*Filtering, ordering, searching available.*

**Permissions**: login required, list only agreements associated with specific item user (taker/giver). Field permissions depend on user type (taker, giver, admin) and other agreement fields.

**Function**: Returns list of all agreements, made as taker or giver. Only one confirmed agreement can exist during the days specified. Links taker user, if specified email is confirmed. If the item is public and taker creates agreement, its status must be confirmed or cancelled by owner. Sends emails to taker and giver on creation.

## GET, PATCH, DELETE: /items/{item_id}/agreements/{id}
**Permissions**: login required, list only agreements associated with user (taker/giver). Field permissions depend on user type (taker, giver, admin) and other agreement fields.

**Function**: Returns a single editable agreement. Taker can only cancel the status once and only if the agreement is not expired or already confirmed. Sends emails to taker and giver on update.

## POST: /agreements/link
**Permissions**: login required.

**Function**: Request user gets associated with all not linked agreements that have their confirmed email in receiver_email field. This is irreversible. If no such agreement exists, returns 404 status.
