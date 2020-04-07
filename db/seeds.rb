# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

MusicGenre.create_with(verified_at: Time.current, slug: 'pop').find_or_create_by!(name: 'POP')
MusicGenre.create_with(verified_at: Time.current, slug: 'rock').find_or_create_by!(name: 'Rock')
MusicGenre.create_with(verified_at: Time.current, slug: 'folk').find_or_create_by!(name: 'Folk')
MusicGenre.create_with(verified_at: Time.current, slug: 'classic').find_or_create_by!(name: 'Classic')
MusicGenre.create_with(verified_at: Time.current, slug: 'samba').find_or_create_by!(name: 'Samba')

Artist.create_with(verified_at: Time.current, slug: 'madonna').find_or_create_by!(name: 'Madonna')
Artist.create_with(verified_at: Time.current, slug: 'kelly-clarkson').find_or_create_by!(name: 'Kelly Clarkson')
Artist.create_with(verified_at: Time.current, slug: 'lady-gaga').find_or_create_by!(name: 'Lady Gaga')
Artist.create_with(verified_at: Time.current, slug: 'boyce-avenue').find_or_create_by!(name: 'Boyce Avenue')
Artist.create_with(verified_at: Time.current, slug: 'zara-larsson').find_or_create_by!(name: 'Zara Larsson')

Location.create_with(verified_at: Time.current).find_or_create_by!(name: 'Madison Square Garden')
Location.create_with(verified_at: Time.current).find_or_create_by!(name: 'Michigan Stadium')
Location.create_with(verified_at: Time.current).find_or_create_by!(name: 'Beaver Stadium')
Location.create_with(verified_at: Time.current).find_or_create_by!(name: 'Kyle Field')
Location.create_with(verified_at: Time.current).find_or_create_by!(name: 'Ohio Stadium')
