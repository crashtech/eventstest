module HasFuzzySearch
  extend ActiveSupport::Concern

  class_methods do
    def fuzzysearch(*fields)
      scope :fuzzysearch, ->(value, condition: :or) do
        conditions = fields.flat_map do |field|
          query = arel_soundex(arel_attribute(field)).eq(arel_soundex(value))
          query.or(arel_attribute(field).matches("%#{value}%"))
        end

        where(conditions.reduce(&condition))
      end
    end

    def arel_soundex(value)
      value = Arel.sql(connection.quote(value)) if value.is_a?(String)
      ::Arel::Nodes::NamedFunction.new('soundex', [value])
    end
  end
end
