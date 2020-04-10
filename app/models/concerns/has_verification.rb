module HasVerification
  extend ActiveSupport::Concern

  included do
    scope :verified, -> { where.not(verified_at: nil) }
  end

  def verified?
    verified_at.present?
  end

  def verify!
    touch(:verified_at)
  end
end
