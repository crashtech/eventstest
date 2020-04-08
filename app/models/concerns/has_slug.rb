module HasSlug
  extend ActiveSupport::Concern

  included do
    validate :validate_slug
  end

  class_methods do
    def find_by_slug(value)
      value.is_a?(Numeric) || value.to_s.match?(/\A[0-9]\z/) ? find(value) : find_by(slug: value)
    end
  end

  protected

    def valid_slug?
      slug&.match? /\A[-a-z0-9]{3,32}\z/
    end

  private

    def validate_slug
      errors.add(:slug, :invalid) if slug.present? && !valid_slug?
    end
end
