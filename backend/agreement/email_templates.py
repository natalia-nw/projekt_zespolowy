def email_new_agree_receiver(item_name, item_owner, date_start, date_stop) -> dict:
    email = {"subject": "Pożyczono Tobie przedmiot",
             "body": f"Przedmiot: {item_name}\n Właściciel: {item_owner}\n"
                     f"Termin wypożyczenia: {date_start}\n Termin oddania: {date_stop}\n "
                     f"Załóż konto z tym samym emailem w serwisie Pożycz, zapomnij,"
                     f"a wypożyczenie zostanie przypisane do swojego konta."}
    return email


def email_new_agree_receiver_user(item_name, item_owner, date_start, date_stop) -> dict:
    email = {"subject": "Pożyczono Tobie przedmiot",
             "body": f"Przedmiot: {item_name}\n Właściciel: {item_owner}\n"
                     f"Termin wypożyczenia: {date_start}\n Termin oddania: {date_stop}"
                     f"Aktualne dane i więcej znajdziesz na naszej stronie.\n Administracja Pożycz, zapomnij"}
    return email


def email_new_proposal_receiver_user(item_name, item_owner, date_start, date_stop) -> dict:
    email = {"subject": "Wysłano prośbę wypożyczenia dla przedmiotu",
             "body": f"Właściciel musi ją najpierw zatwierdzić."
                     f"Przedmiot: {item_name}\n Właściciel: {item_owner}\n"
                     f"Termin wypożyczenia: {date_start}\n Termin oddania: {date_stop}\n"
                     f"Aktualne dane i więcej znajdziesz na naszej stronie.\n Administracja Pożycz, zapomnij"}
    return email


def email_new_proposal_owner_user(item_name, item_receiver, date_start, date_stop) -> dict:
    email = {"subject": "Otrzymałeś prośbę wypożyczenia dla przedmiotu",
             "body": f"Możesz potwierdzić lub odrzucić prośbę na naszej stronie."
                     f"Przedmiot: {item_name}\n Dla: {item_receiver}\n"
                     f"Termin wypożyczenia: {date_start}\n Termin oddania: {date_stop}\n"
                     f"Aktualne dane i więcej znajdziesz na naszej stronie.\n Administracja Pożycz, zapomnij"}
    return email


def email_updated_agreement_no_user(item_name, item_owner, date_stop) -> dict:
    email = {"subject": "Nowe informacje o pożyczonym przedmiocie",
             "body": f"Przedmiot: {item_name}\n Właściciel: {item_owner}\n"
                     f"Termin oddania: {date_stop}\n "
                     f"Załóż konto z tym samym emailem w serwisie Pożycz, zapomnij,"
                     f"a wypożyczenie zostanie przypisane do swojego konta."}
    return email


def email_updated_agreement_user(item_name, item_owner, date_stop) -> dict:
    email = {"subject": "Nowe informacje o pożyczonym przedmiocie",
             "body": f"Przedmiot: {item_name}\n Właściciel: {item_owner}\n"
                     f"Termin oddania: {date_stop}\n\n Administracja Pożycz, zapomnij"}
    return email
